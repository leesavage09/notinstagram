import React from 'react';
import UserAvatar from './user_avatar';
import { useHistory } from "react-router-dom";
import { TextFollowButton } from '../components/followButtons';

export default function UserListItem(props) {
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
            {props.children}
        </li>
    );
}

export function FollowableUserListItem(props) {
    return (
        <UserListItem
            key={props.user.id}
            user={props.user}
        >
            <TextFollowButton
                className="follows-list__follow-button"
                user_id={props.user.id}
            />
        </UserListItem>
    )
}