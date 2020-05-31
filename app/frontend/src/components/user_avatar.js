import { useSelector } from 'react-redux'
import React from 'react';
import { uiLoadingSelector } from '../redux/slice/ui_loading_slice'
import LoadingSpinner, { SMALL_LOADING_SPINNER, LARGE_LOADING_SPINNER } from './loading_spinner';
import { imagePath } from '../util/helpers'

export { SMALL_LOADING_SPINNER, LARGE_LOADING_SPINNER }

export default function UserAvatar(props) {
    const imageUrl = props.user.image_url || `${imagePath}/no_avatar.jpg`

    const loading = props.spinnerStyle ? useSelector(uiLoadingSelector.avatar_loading_spinner()) : false
    const spinnerElement = loading ? <LoadingSpinner spinnerStyle={props.spinnerStyle} /> : ''

    return (
        <div className={`${props.className} user-avatar`}>
            <img
                className="user-avatar__image"
                alt={`${props.user.name}'s avatar`}
                src={imageUrl}
                onClick={props.onClick}
            />
            {spinnerElement}
        </div>
    );
}