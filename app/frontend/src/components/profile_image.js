import { useSelector } from 'react-redux'
import React from 'react';
import * as UISelector from '../redux/selectors/ui_selector'

export const SMALL_LOADING_SPINNER = '--small'
export const LARGE_LOADING_SPINNER = '--large'

export default function ProfileImage(props) {
    const imageUrl = props.user.image_url || "/no_profile.jpg"

    const loading = props.spinner ? useSelector(state => UISelector.isAwaitingAsync(state)) : false
    const spinner = loading ? (
        <div className='profile-image__spinner'>
            <div className='profile-image__spinner-container'>
                <div className={`profile-image__lds-spinner profile-image__lds-spinner${props.spinner}`}>
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                </div>
            </div>
        </div>
    ) : ''

    return (
        <div className={`${props.className} profile-image`}>
            <img
                className="profile-image__image"
                alt={`${props.user.name}'s profile picture`}
                src={imageUrl}
                onClick={props.onClick}
            />
            {spinner}
        </div>
    );
}