import { useSelector, useDispatch } from 'react-redux'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserAvatar from './user_avatar';
import { normalizedCommentsSelector } from '../redux/slice/normalized_comments_slice'
import { normalizedUsersSelector } from '../redux/slice/normalized_users_slice'
import { PostActions } from '../redux/slice/post_slice';
import { sessionSelector } from '../redux/slice/session_slice';
import { modalActions } from '../redux/slice/modal_slice';
import { LikeIcon, CommentIcon, BookmarkIcon, ShareIcon, UnlikeIcon } from './svg_icon';

export default function Post(props) {
    const post = props.post

    return (
        <div className="post-feed__body">
            <PostAuthor post={post} />
            <PostPhoto post={post} />
            <div className="post-feed__details">
                <Likes post={post} />
                <PostCaption post={post} />
                <Comments post={post} />
                <div className="post-feed__time">{post.time_ago} ago</div>
            </div>
        </div>
    )
}

function PostAuthor(props) {
    const author = useSelector(normalizedUsersSelector.getUser(props.post.author_id))
    return (
        <div className="post-feed__author">
            <Link className="dark-link" to={`/profile/?user_id=${author.id}`}>
                <UserAvatar className="post-feed__author-img" user={author} />
            </Link>
            <Link className="dark-link" to={`/profile/?user_id=${author.id}`}>
                <div className="post-feed__author-username">{author.username}<span className="post-feed__author-name">{author.name}</span></div>
            </Link>
        </div>
    );
}

function PostPhoto(props) {
    const dispatch = useDispatch()
    const loggedInUser = useSelector(sessionSelector.loggedInUser())
    const isLiked = props.post.liker_ids.includes(loggedInUser.id)

    const save_action = () => {
        dispatch(modalActions.showSaveModal(true))
    }

    const direct_message_action = () => {
        dispatch(modalActions.showDMModal(true))
    }

    const likePost = () => {
        dispatch(PostActions.likePost({ id: props.post.id }))
    }

    const unlikePost = () => {
        dispatch(PostActions.unlikePost({ id: props.post.id }))
    }

    let lastClickTime = 0;
    const handleImageClick = () => {
        const clickNow = Date.now()
        if ((clickNow - lastClickTime) < 500) {
            like_action()
        }
        lastClickTime = clickNow
    }

    const like_action = isLiked ? unlikePost : likePost

    return (
        <div>
            <img className="post-feed__photo" src={props.post.image_url} onClick={handleImageClick} />
            <div className="post-feed__buttons">
                <button className="post-feed__button text-button" onClick={like_action}>
                    {isLiked ? <UnlikeIcon className="svg-icon svg-like-animation" /> : <LikeIcon className="svg-icon svg-like-animation" />}
                </button>
                <Link className="post-feed__button text-button"
                    to={`/comments?post_id=${props.post.id}`}>
                    <CommentIcon />
                </Link>
                <button className="post-feed__button text-button" onClick={direct_message_action}>
                    <ShareIcon />
                </button>
                <span className="post-feed__button--right">
                    <button className="post-feed__button text-button" onClick={save_action}>
                        <BookmarkIcon />
                    </button>
                </span>
            </div>
        </div>
    );
}

function Likes(props) {
    const liker_ids = props.post.liker_ids
    const primaryLiker = liker_ids.length > 0 ? useSelector(normalizedUsersSelector.getUser(liker_ids[0])) : null

    if (liker_ids.length < 1) return (<div />)

    const otherLikes = liker_ids.length >= 2 ? (
        <div>
            &nbsp;and&nbsp;
            <Link
                className="dark-link"
                to={`/likes?post_id=${props.post.id}`}>
                {liker_ids.length - 1}&nbsp;others
            </Link>
        </div>
    ) : (<div />)

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

export function PostCaption(props) {
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
    const words = addHashtagLinks(props.text)

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

function addHashtagLinks(text) {
    const words = text.split(' ').map((word) => {
        if (word.match(/\B\#\w\w+\b/g)) {
            return (
                <Link
                    key={word}
                    className="post-feed__hashtag-link"
                    to={`/profile?hashtag_name=${word.split('#')[1]}`}
                >{word} </Link>
            )
        }
        else {
            return word + " "
        }
    })

    return words
}