import * as ActionTypes from '../actions/action_types';

export const clearMessages = () => {
    return {
        type: ActionTypes.CLEAR_MESSAGES
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