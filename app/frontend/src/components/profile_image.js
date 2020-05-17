import { useSelector } from 'react-redux'
import React from 'react';
import * as UISelector from '../redux/selectors/ui_selector'
import LoadingSpinner, { SMALL_LOADING_SPINNER, LARGE_LOADING_SPINNER } from './loading_spinner';
import {imagePath} from '../util/helpers'

export { SMALL_LOADING_SPINNER, LARGE_LOADING_SPINNER }

export default function ProfileImage(props) {
    const imageUrl = props.user.image_url || `${imagePath()}/no_profile.jpg`

    const loading = props.spinner ? useSelector(UISelector.isAwaitingAsync()) : false
    const spinnerElement = loading ? <LoadingSpinner spinner={props.spinner} /> : ''

    return (
        <div className={`${props.className} profile-image`}>
            <img
                className="profile-image__image"
                alt={`${props.user.name}'s profile picture`}
                src={imageUrl}
                onClick={props.onClick}
            />
            {spinnerElement}
        </div>
    );
}