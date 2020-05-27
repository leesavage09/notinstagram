import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react';
import { loggedInUser } from '../redux/selectors/session_selector'
import { Link } from 'react-router-dom';
import { showChangeAvatarModal } from '../redux/actions/ui_actions'
import BottomNav from './bottom_nav'
import LoggedInTopNav from './top_nav/top_nav_account'
import ViewTopNav from './top_nav/top_nav_back_with_title'
import SVGIcon from './svg_icon'
import UserAvatar, { LARGE_LOADING_SPINNER } from './user_avatar';
import queryString from 'query-string';
import * as ProfileActions from '../redux/actions/pages/profile_actions'
import * as PostSelector from '../redux/selectors/normalized/post_selector'
import * as CommentsSelector from '../redux/selectors/normalized/comment_selector'
import * as UserSelector from '../redux/selectors/normalized/users_selector'

export default function PostFeed(props) {
    const postImages = []
    if (props.user.post_ids) {
        const posts = useSelector(PostSelector.getPosts(props.user.post_ids))
        posts.forEach((post) => {
            postImages.push(<FeedItem key={post.id} post={post} />)
        })
    }

    return (
        <div className="post-feed">
            {postImages}
        </div>
    )
}

function FeedItem(props) {
    const post = props.post
    const author = useSelector(UserSelector.getUser(props.post.author_id))


    return (
        <div>
            <div className="post-feed__author">
                <Link className="dark-link" to={`/profile/?user_id=${author.id}&page=0`}>
                    <UserAvatar className="post-feed__author-img" user={author} />
                </Link>
                <Link className="dark-link" to={`/profile/?user_id=${author.id}&page=0`}>
                    <div className="post-feed__author-username">{author.username}<span className="post-feed__author-name">{author.name}</span></div>
                </Link>
            </div>
            <img className="post-feed__photo" key={post.id} src={post.image_url} />
            <div className="post-feed__details">
                <div className="post-feed__buttons">
                    <button className="post-feed__button text-button">
                        <svg className="svg-icon" viewBox="0 0 48 48">
                            <path className="svg-like-icon"></path>
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

                <Likes liker_ids={post.liker_ids} />
                <PostCaption post={post} />
                <Comments comment_ids={post.comment_ids} />
                <div className="post-feed__time">{post.time_ago} ago</div>
            </div>

        </div>
    )
}

function Likes(props) {
    if (props.liker_ids.length === 0) return (<div />)

    const primaryLiker = props.liker_ids.length > 0 ? useSelector(UserSelector.getUser(props.liker_ids[0])) : null

    return (
        <div className="post-feed__likes">Liked by
            <Link
                className="dark-link"
                to={`/profile/?user_id=${primaryLiker.id}&page=0`}
            > {primaryLiker.username}
            </Link> and<Link
                className="dark-link"
                to="/likes"
            > {props.liker_ids.length} others
            </Link>
        </div>
    )
}

function PostCaption(props) {
    const author = useSelector(UserSelector.getUser(props.post.author_id))

    const regex = /\B\#\w\w+\b/g

    const caption = props.post.caption.replace(regex, '');

    const hastagLinks = []
    const hastags = props.post.caption.match(regex);
    hastags.forEach((hashtag) => {
        hastagLinks.push(
            <Link
                className="post-feed__hashtag-link"
                key={hashtag}
                to={`/hastag?tag=${hashtag.split('#')[1]}`}
            >{hashtag} </Link>
        )
    })

    return (
        <div className="post-feed__caption">
            <UserText user={author} text={caption} hashtag_links={hastagLinks} />
        </div>
    )
}

function Comments(props) {
    const comments = props.comment_ids.length > 0 ? useSelector(CommentsSelector.getComments(props.comment_ids)) : []
    const commentBodys = []

    comments.slice(0, 2).forEach((comment) => {
        const user = useSelector(UserSelector.getUser(comment.author_id))
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
                    to="/comments"
                >{comments.length > 1 ? `View all ${comments.length} comments` : "View comment"}</Link>
            </div>
            {commentBodys}
        </div>
    )
}

function UserText(props) {
    const [showText, setShowText] = useState(props.text.substring(0, 125));

    const textIsTruncated = showText.length < props.text.length

    const showFullText = () => {
        setShowText(props.text)
    }

    return (
        <div className="post-feed__comment-body">
            <Link className="dark-link" to={`/profile/?user_id=${props.user.id}&page=0`} >{props.user.username} </Link>
            {showText}
            {textIsTruncated ? <a className="light-link" onClick={showFullText}  >... more</a> : ""}
            {textIsTruncated ? "" : props.hashtag_links}
        </div>
    )
}