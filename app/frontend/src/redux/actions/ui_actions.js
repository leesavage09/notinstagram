import * as ActionTypes from '../actions/action_types';

export const browserRouteChanged = () => {
    return {
        type: ActionTypes.BROWSER_ROUTE_CHANGED
    }
}

export const asyncRequest = () => {
    return {
        type: ActionTypes.ASYNC_REQUEST
    }
}

export const showProfilePhotoModal = () => {
    return {
        type: ActionTypes.SHOW_PROFILE_PHOTO_MODAL
    }
}

export const hideProfilePhotoModal = () => {
    return {
        type: ActionTypes.HIDE_PROFILE_PHOTO_MODAL
    }
}