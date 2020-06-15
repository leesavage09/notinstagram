import { useSelector, useDispatch } from 'react-redux'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserAvatar from './user_avatar';
import { normalizedCommentsSelector } from '../redux/slice/normalized_comments_slice'
import { normalizedUsersSelector } from '../redux/slice/normalized_users_slice'
import { PostActions } from '../redux/slice/post_slice';
import { sessionSelector } from '../redux/slice/session_slice';

export default function Post(props) {
    const dispatch = useDispatch()
    const post = props.post
    const loggedInUser = useSelector(sessionSelector.loggedInUser())
    const isLiked = post.liker_ids.includes(loggedInUser.id)
    const author = useSelector(normalizedUsersSelector.getUser(props.post.author_id))
    const [likeAnimation, setlikeAnimation] = useState("svg-icon");

    const likePost = () => {
        dispatch(PostActions.likePost({ id: post.id }))
        setlikeAnimation("svg-icon svg-like-animation")
    }

    const unlikePost = () => {
        dispatch(PostActions.unlikePost({ id: post.id }))
        setlikeAnimation("svg-icon svg-unlike-animation")
    }

    let lastClickTime = 0;
    const handleImageClick = () => {
        const clickNow = Date.now()
        if ((clickNow - lastClickTime) < 500) {
            like_action()
        }
        lastClickTime = clickNow
    }

    const like_style = isLiked ? "svg-unlike-icon" : "svg-like-icon"
    const like_action = isLiked ? unlikePost : likePost

    return (
        <div className="post-feed__body">
            <div className="post-feed__author">
                <Link className="dark-link" to={`/profile/?user_id=${author.id}`}>
                    <UserAvatar className="post-feed__author-img" user={author} />
                </Link>
                <Link className="dark-link" to={`/profile/?user_id=${author.id}`}>
                    <div className="post-feed__author-username">{author.username}<span className="post-feed__author-name">{author.name}</span></div>
                </Link>
            </div>
            <img className="post-feed__photo" key={post.id} src={post.image_url} onClick={null} onClick={handleImageClick} />
            <div className="post-feed__details">
                <div className="post-feed__buttons">
                    <button className="post-feed__button text-button" onClick={like_action}>
                        <svg className={likeAnimation} viewBox="0 0 48 48">
                            <path className={like_style}></path>
                        </svg>
                    </button>
                    <button className="post-feed__button text-button">
                        <svg className="svg-icon" viewBox="0 0 48 48">
                            <path className="svg-comment-icon"></path>
                        </svg>
                    </button>
                    <button className="post-feed__button text-button">
                        <svg className="svg-icon" viewBox="0 0 48 48">
                            <path className="svg-share-icon"></path>
                        </svg>
                    </button>
                    <span className="post-feed__button--right">
                        <button className="post-feed__button text-button">
                            <svg className="svg-icon" viewBox="0 0 48 48">
                                <path className="svg-bookmark-icon"></path>
                            </svg>
                        </button>
                    </span>
                </div>

                <Likes post={post} />
                <PostCaption post={post} />
                <Comments post={post} />
                <div className="post-feed__time">{post.time_ago} ago</div>
            </div>

        </div>
    )
}

function Likes(props) {
    const liker_ids = props.post.liker_ids
    if (liker_ids.length === 0) return (<div />)

    const primaryLiker = liker_ids.length > 0 ? useSelector(normalizedUsersSelector.getUser(liker_ids[0])) : null

    const otherLikes = liker_ids.length >= 2 ? (
        <div>
            &nbsp;and&nbsp;
            <Link
                className="dark-link"
                to={`/likes?post_id=${props.post.id}`}>
                {liker_ids.length - 1}&nbsp;others
            </Link>
        </div>
    ) : (<div/>)

    return (
        <div className="post-feed__likes">
            <UserAvatar className="post-feed__liker-avatar" user={primaryLiker} />
            Liked by&nbsp;
            <Link
                className="dark-link"
                to={`/profile/?user_id=${primaryLiker.id}`}
            >{primaryLiker.username}
            </Link>
            {otherLikes}
        </div>
    )
}

function PostCaption(props) {
    const author = useSelector(normalizedUsersSelector.getUser(props.post.author_id))

    return (
        <div className="post-feed__caption">
            <UserText user={author} text={props.post.caption} />
        </div>
    )
}

function Comments(props) {
    const comment_ids = props.post.comment_ids
    const comments = comment_ids.length > 0 ? useSelector(normalizedCommentsSelector.getComments(comment_ids)) : []
    const commentBodys = []

    comments.slice(0, 2).forEach((comment) => {
        const user = useSelector(normalizedUsersSelector.getUser(comment.author_id))
        commentBodys.push(
            <UserText key={comment.id} user={user} text={comment.body} />
        )
    })


    if (comments.length === 0) {
        return (<div />)
    }

    return (
        <div className="post-feed__comments">
            <div className="post-feed__comments-link">
                <Link
                    className=" light-link"
                    to={`/comments?post_id=${props.post.id}`}
                >
                    {comments.length > 1 ? `View all ${comments.length} comments` : "View comment"}
                </Link>
            </div>
            {commentBodys}
        </div>
    )
}

function UserText(props) {
    const words = props.text.split(' ').map((word) => {
        if (word.match(/\B\#\w\w+\b/g)) {
            return <HashtagLink key={word} hashtag_name={word} />
        }
        else {
            return word + " "
        }
    })

    const [showWords, setShowWords] = useState(words.slice(0, 10));
    const textIsTruncated = words.length != showWords.length

    const showFullText = () => {
        setShowWords(words)
    }

    return (
        <div className="post-feed__comment-body">
            <Link className="dark-link" to={`/profile/?user_id=${props.user.id}`} >{props.user.username} </Link>
            {showWords}
            {textIsTruncated ? <a className="light-link" onClick={showFullText}  >... more</a> : ""}
        </div>
    )
}

function HashtagLink(props) {
    return (
        <Link
            className="post-feed__hashtag-link"
            to={`/profile?hashtag_name=${props.hashtag_name.split('#')[1]}`}
        >{props.hashtag_name} </Link>
    )
}