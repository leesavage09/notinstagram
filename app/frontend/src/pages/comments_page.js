import { TopNavBackWithTitle } from '../components/top_nav'
import BottomNav from '../components/bottom_nav'
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import UserAvatar from '../components/user_avatar';
import { sessionSelector } from '../redux/slice/session_slice';
import LoadingSpinner from '../components/loading_spinner';
import { normalizedPostsSelector } from '../redux/slice/normalized_posts_slice';
import { PostActions } from '../redux/slice/post_slice';
import CommentsListItems from '../components/comments_list_item';
import { commentActions } from '../redux/slice/comment_slice';

export default function CommentsPage(props) {
    const dispatch = useDispatch()
    const query = queryString.parse(props.location.search)
    const post = useSelector(normalizedPostsSelector.getPost(query.post_id))

    useEffect(() => {
        dispatch(PostActions.showPost({ id: query.post_id }))
    }, [query.post_id]);

    return (
        <div>
            <CommentInput post={post}/>
            <CommentsListItems post={post} />
            <BottomNav />
        </div>
    );
}

function CommentInput(props) {
    const dispatch = useDispatch()
    const searchBox = React.createRef()
    const cancelBtn = React.createRef()
    const loggedInUser = useSelector(sessionSelector.loggedInUser())
    const loading = false;
    const spinnerElement = loading ? <LoadingSpinner spinnerStyle="" /> : ''

    const handleCancel = () => {
        dispatch(commentActions.createComment({ body: searchBox.current.value, post_id: props.post.id }))
    }
    return (
        <div className="comment-input">
            <TopNavBackWithTitle title="Comments" />
            <div className="comment-input__container">
                <UserAvatar
                    className="comment-input__avatar"
                    user={loggedInUser}
                />
                <div className="comment-input__area">
                    <input
                        className="comment-input__text"
                        ref={searchBox}
                        type="text"
                        placeholder='Add a comment...'
                    />
                    <div className="comment-input__spinner">{spinnerElement}</div>
                    <button
                        className="text-button text-button--blue comment-input__button"
                        ref={cancelBtn}
                        onClick={handleCancel}>
                        Post
                </button>
                </div>
            </div>
        </div >
    );
}
