import { useSelector, useDispatch } from 'react-redux'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserAvatar from './user_avatar';
import { normalizedCommentsSelector } from '../redux/slice/normalized_comments_slice'
import { normalizedUsersSelector } from '../redux/slice/normalized_users_slice'
import { PostActions } from '../redux/slice/post_slice';
import { sessionSelector } from '../redux/slice/session_slice';
import { modalActions } from '../redux/slice/modal_slice';
import { PostCaption } from './post';

export default function CommentsListItems(props) {
    const comment_ids = props.post ? props.post.comment_ids : []
    const comments = comment_ids.length > 0 ? useSelector(normalizedCommentsSelector.getComments(comment_ids)) : []
    const commentBodys = []

    comments.forEach((comment) => {
        commentBodys.push(
            <CommentListItem key={comment.id} comment={comment} />
        )
    })

    return (
        <div className="comments-list">
            <PostBody post={props.post} />
            {commentBodys}
        </div>
    )
}

function PostBody(props) {
    const author_id = props.post ? props.post.author_id : null
    const author = useSelector(normalizedUsersSelector.getUser(author_id))

    if (!author) {
        return (<div />);
    }

    return (
        <div className="comments-list__post">
            <UserAvatar
                className="comments-list__avatar"
                user={author}
            />
            <div>
                <PostCaption post={props.post} />
                <div className="comments-list__footer">{props.post.time_ago}</div>
            </div>
        </div>
    );
}


function CommentListItem(props) {
    const comment = props.comment
    const author = useSelector(normalizedUsersSelector.getUser(comment.author_id))

    return (
        <div className="comments-list__comment" >
            <UserAvatar
                className="comments-list__avatar"
                user={author}
            />

            <div className="comments-list__body">
                <a className="dark-link">{author.username} </a>
                {comment.body}
                <div className="comments-list__footer">
                    {comment.time_ago} 
                    {/* <button className="text-button comments-list__reply">Reply</button> */}
                </div>
            </div>

            {/* <svg className="svg-icon comments-list__like-svg" viewBox="0 0 48 48">
                <path className="svg-like-icon"></path>
            </svg> */}
        </div>
    );
}


