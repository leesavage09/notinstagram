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
        case ActionTypes.LOGIN_FAILURE:
        case ActionTypes.LOGOUT_FAILURE:
        case ActionTypes.CREATE_USER_FAILURE:
        case ActionTypes.UPDATE_USER_FAILURE:
        case ActionTypes.UPDATE_PASSWORD_FAILURE:
        case ActionTypes.IMAGE_SELECT_FAILURE:
        case ActionTypes.UPDATE_PROFILE_IMAGE_FAILURE:
            return newError(state, action.payload)
        case ActionTypes.CREATE_USER_SUCCESS:
            return newMessage(state, "User created")
        case ActionTypes.UPDATE_USER_SUCCESS:
            return newMessage(state, "Profile saved")
        case ActionTypes.UPDATE_PROFILE_IMAGE_SUCCESS:
            return newMessage(state, "Profile image changed")
        case ActionTypes.LOGOUT_SUCCESS:
            return newMessage(state, "Logout successful")
        case ActionTypes.LOGIN_SUCCESS:
            return newMessage(state, "Login successful")
        case ActionTypes.UPDATE_PASSWORD_SUCCESS:
            return newMessage(state, action.payload)
        case ActionTypes.CLEAR_MESSAGES:
            return clearMessage(state)
        default:
            return state;
    }
};

export default UIReducer;


function newError(state, error) {
    return Object.assign({}, state, {
        errors: true, messages: format_data(error),
        is_awaiting_async: false
    })
}

function newMessage(state, message) {
    return Object.assign({}, state, {
        errors: false, messages: format_data(message),
        is_awaiting_async: false
    })
}

function clearMessage(state) {
    return Object.assign({}, state, {
        errors: false, messages: newMessage
    })
}

function format_data(e) {
    if (e.isAxiosError && e.response && e.response.data && e.response.data.errors) {
        return e.response.data.errors
    }
    else if (typeof(e) === "string") {
        return { message: [e] }
    }
    else if (e.name==="Error") {
        return { error: [e.message] }
    }
    else {
        return e
    }
}