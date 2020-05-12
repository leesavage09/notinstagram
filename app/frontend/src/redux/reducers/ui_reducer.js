import * as ActionTypes from '../actions/action_types'

const _default = {
    errors: false,
    is_awaiting_async: false,
    messages: {}
};

const UIReducer = (state = _default, action) => {
    Object.freeze(state);

    switch (action.type) {
        case ActionTypes.ASYNC_REQUEST:
            return Object.assign({}, state, { is_awaiting_async: true })
        case ActionTypes.LOGIN_USER_FAILURE:
        case ActionTypes.LOGOUT_FAILURE:
        case ActionTypes.CREATE_USER_FAILURE:
        case ActionTypes.UPDATE_USER_FAILURE:
        case ActionTypes.UPDATE_PASSWORD_FAILURE:
        case ActionTypes.IMAGE_SELECT_FAILURE:
        case ActionTypes.UPLOAD_IMAGE_FAILURE:
            return newError(state, action.payload)
        case ActionTypes.UPDATE_USER_SUCCESS:
            return newMessage(state, { success: ["Profile Saved"] })
        case ActionTypes.LOGOUT_SUCCESS:
            return newMessage(state, { success: ["Logout Successful"] })
        case ActionTypes.LOGIN_USER_SUCCESS:
            return newMessage(state, { success: ["Login Successful"] })
        case ActionTypes.UPDATE_PASSWORD_SUCCESS:
            return newMessage(state, action.payload)
        case ActionTypes.CLEAR_MESSAGES:
            return clearMessage(state)
        default:
            return state;
    }
};

export default UIReducer;


function newError(state, newError) {
    return Object.assign({}, state, {
        errors: true, messages: newError,
        is_awaiting_async: false
    })
}

function newMessage(state, newMessage) {
    return Object.assign({}, state, {
        errors: false, messages: newMessage,
        is_awaiting_async: false
    })
}

function clearMessage(state) {
    return Object.assign({}, state, {
        errors: false, messages: newMessage
    })
}