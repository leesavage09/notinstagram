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