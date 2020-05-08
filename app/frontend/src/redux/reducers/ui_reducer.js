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
            return Object.assign({}, _default, { is_awaiting_async: true })
        case ActionTypes.LOGIN_USER_FAILURE:
        case ActionTypes.LOGOUT_FAILURE:
        case ActionTypes.CREATE_USER_FAILURE:
        case ActionTypes.UPDATE_USER_FAILURE:
        case ActionTypes.UPDATE_PASSWORD_FAILURE:
            return newError(action.payload)
        case ActionTypes.UPDATE_USER_SUCCESS:
            return newMessage({ success: ["Profile Saved"] })
        case ActionTypes.UPDATE_PASSWORD_SUCCESS:
            return newMessage(action.payload)
        case ActionTypes.CLEAR_MESSAGES:
            return _default
        default:
            return state;
    }
};

export default UIReducer;


function newError(newError) {
    return Object.assign({}, _default, { errors: true, messages: newError })
}

function newMessage(newMessage) {
    return Object.assign({}, _default, { errors: false, messages: newMessage })
}