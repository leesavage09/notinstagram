import React from 'react';
import UserAvatar from './user_avatar';

export default function UserListItem(props) {
    return (
        <li
            className="user-list-item"
            onClick={props.onClick}
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