import React from 'react';
import UserAvatar from './user_avatar';
import { useHistory } from "react-router-dom";
import { TextFollowButton } from '../components/followButtons';
import { useSelector } from 'react-redux'
import { normalizedUsersSelector } from '../redux/slice/normalized_users_slice';
import { normalizedPostsSelector } from '../redux/slice/normalized_posts_slice';

export function SimpleUserListItem(props) {
    const history = useHistory();
    return (
        <li
            className="user-list-item"
            onClick={() => {
                history.push(`profile/?user_id=${props.user.id}`)
            }}
        >
            <UserAvatar
                className="user-list-item__image"
                user={props.user}
            />
            <div className="user-list-item__details">
                <div className="user-list-item__username">{props.user.username}</div>
                <div className="user-list-item__name">{props.user.name}</div>
            </div>
        </li>
    )
}

export function PostNotificationListItem(props) {
    const history = useHistory();
    const user = useSelector(normalizedUsersSelector.getUser(props.notification.source_user_id))
    const post = useSelector(normalizedPostsSelector.getPost(props.notification.source_post_id))
    return (
        <li
            className="user-list-item"
            onClick={(e) => {
                e.stopPropagation
                history.push(`post?id=${post.id}`)
            }}
        >
            <UserAvatar
                className="user-list-item__image"
                user={user}
                onClick={(e) => {
                    e.stopPropagation()
                    history.push(`profile/?user_id=${user.id}`)
                }}
            />
            <div className="user-list-item__details">
                <span
                    className="user-list-item__username"
                    onClick={(e) => {
                        e.stopPropagation()
                        history.push(`profile/?user_id=${user.id}`)
                    }}
                >{user.username}
                </span>
                <span className="user-list-item__message"> {props.notification.message}</span>
                <br />
                <span className="user-list-item__time"> {props.notification.time_ago}</span>
            </div>
            <img
                className="user-list-item__post-image"
                src={post.image_url}
            />
        </li>
    )
}

export function FollowNotificationListItem(props) {
    const history = useHistory();
    const user = useSelector(normalizedUsersSelector.getUser(props.notification.source_user_id))
    return (
        <li
            className="user-list-item"
            onClick={(e) => {
                e.stopPropagation
                history.push(`profile/?user_id=${user.id}`)
            }}
        >
            <UserAvatar
                className="user-list-item__image"
                user={user}
            />
            <div className="user-list-item__details">
                <span className="user-list-item__username">{user.username}</span>
                <span className="user-list-item__message"> {props.notification.message}</span>
                <br />
                <span className="user-list-item__time"> {props.notification.time_ago}</span>
            </div>
            <TextFollowButton
                className="follows-list__follow-button"
                user_id={user.id}
            />
        </li>
    )
}

export function FollowableUserListItem(props) {
    const history = useHistory();
    return (
        <li
            className="user-list-item"
            onClick={() => {
                history.push(`profile/?user_id=${props.user.id}`)
            }}
        >
            <UserAvatar
                className="user-list-item__image"
                user={props.user}
            />
            <div className="user-list-item__details">
                <div className="user-list-item__username">{props.user.username}</div>
                <div className="user-list-item__name">{props.user.name}</div>
            </div>
            <TextFollowButton
                className="follows-list__follow-button"
                user_id={props.user.id}
            />
        </li>
    )
}