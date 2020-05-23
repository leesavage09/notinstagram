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

export const showChangeAvatarModal = () => {
    return {
        type: ActionTypes.SHOW_USER_PHOTO_MODAL
    }
}

export const hideChangeAvatarModal = () => {
    return {
        type: ActionTypes.HIDE_USER_PHOTO_MODAL
    }
}