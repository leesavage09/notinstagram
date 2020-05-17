import React from 'react';
import ProfileImage from './profile_image';

export default function ProfileItem(props) {


    return (
        <li
            className="profile-item"
            onClick={props.onClick}
        >
            <ProfileImage
                className="profile-item__image"
                user={props.profile}
            />
            <div className="profile-item__details">
                <div className="profile-item__username">{props.profile.username}</div>
                <div className="profile-item__name">{props.profile.name}</div>
            </div>
        </li>
    );
}