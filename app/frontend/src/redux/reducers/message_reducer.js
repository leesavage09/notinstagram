import * as ActionTypes from '../actions/action_types'

const _noMessages = {
    errors: false,
    update_user_success: false,
    messages: {}
};

const MessageReducer = (state = _noMessages, action) => {
    Object.freeze(state);

    switch (action.type) {
        case ActionTypes.LOGIN_USER_FAILURE:
            return Object.assign({}, _noMessages, { errors: true, messages: action.error })
        case ActionTypes.LOGOUT_FAILURE:
            return Object.assign({}, _noMessages, { errors: true, messages: action.error })
        case ActionTypes.CREATE_USER_FAILURE:
            return Object.assign({}, _noMessages, { errors: true, messages: action.error })
        case ActionTypes.UPDATE_USER_FAILURE:
            return Object.assign({}, _noMessages, { errors: true, messages: action.error })
        case ActionTypes.UPDATE_USER_SUCCESS:
            return Object.assign({}, _noMessages, { update_user_success: true })
        case ActionTypes.CLEAR_MESSAGES:
            return _noMessages
        default:
            return state;
    }
};

export default MessageReducer;