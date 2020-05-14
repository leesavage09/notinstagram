import * as ActionTypes from '../actions/action_types';

export const createAsyncRequest = () => {
    return (dispatch) => {
        dispatch(clearMessages())
        dispatch(asyncRequest())
    }
}

export const clearMessages = () => {
    return {
        type: ActionTypes.CLEAR_MESSAGES
    }
}

const asyncRequest = () => {
    return {
        type: ActionTypes.ASYNC_REQUEST
    }
}

export const showProfilePhotoModal = (show) => {
    return {
        type: ActionTypes.SHOW_PROFILE_PHOTO_MODAL,
        payload: show
    }
}