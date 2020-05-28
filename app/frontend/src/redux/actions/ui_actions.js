import * as ActionTypes from '../actions/action_types';

// export const clearMessages = createAction(ActionTypes.CLEAR_MESSAGES)
export const clearMessages = () => {
    return {
        type: ActionTypes.CLEAR_MESSAGES
    }
}

// export const showChangeAvatarModal = createAction(ActionTypes.SHOW_USER_PHOTO_MODAL)

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

export const showLogOutModal = () => {
    return {
        type: ActionTypes.SHOW_LOGOUT_MODAL
    }
}

export const hideLogOutModal = () => {
    return {
        type: ActionTypes.HIDE_LOGOUT_MODAL
    }
}