import * as ActionTypes from '../actions/action_types'

const _default = {
    errors: false,
    button_loading: false,
    avatar_loading: false,
    messages: {},
    show_change_avatar_modal: false
};

const UIReducer = (state = _default, action) => {
    Object.freeze(state);

    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
        case ActionTypes.LOGOUT_REQUEST:
        case ActionTypes.CREATE_USER_REQUEST:
        case ActionTypes.UPDATE_USER_REQUEST:
        case ActionTypes.UPDATE_PASSWORD_REQUEST:
            return Object.assign({}, state, { button_loading: true })

        case ActionTypes.UPDATE_USER_AVATAR_REQUEST:
        case ActionTypes.REMOVE_USER_AVATAR_REQUEST:
            return Object.assign({}, state, { avatar_loading: true })

        case ActionTypes.LOGIN_FAILURE:
        case ActionTypes.LOGOUT_FAILURE:
        case ActionTypes.CREATE_USER_FAILURE:
        case ActionTypes.UPDATE_USER_FAILURE:
        case ActionTypes.UPDATE_PASSWORD_FAILURE:
        case ActionTypes.IMAGE_SELECT_FAILURE:
        case ActionTypes.UPDATE_USER_AVATAR_FAILURE:
        case ActionTypes.REMOVE_USER_AVATAR_FAILURE:
        case ActionTypes.FOUND_USERS_FAILURE:
        case ActionTypes.GET_USER_FAILURE:
            return newError(state, action.payload)

        case ActionTypes.CREATE_USER_SUCCESS:
        case ActionTypes.LOGOUT_SUCCESS:
        case ActionTypes.LOGIN_SUCCESS:
            return Object.assign({}, clearMessage(state), { button_loading: false })

        case ActionTypes.UPDATE_USER_SUCCESS:
            return newMessage(state, "Profile saved")

        case ActionTypes.UPDATE_USER_AVATAR_SUCCESS:
            return newMessage(state, "Profile photo added")

        case ActionTypes.REMOVE_USER_AVATAR_SUCCESS:
            return newMessage(state, "Profile photo removed")

        case ActionTypes.UPDATE_PASSWORD_SUCCESS:
            return newMessage(state, "Password Updated")

        case ActionTypes.SHOW_USER_PHOTO_MODAL:
            return Object.assign({}, state, { show_change_avatar_modal: true, messages: {}, errors: false })

        case ActionTypes.HIDE_USER_PHOTO_MODAL:
            return Object.assign({}, state, { show_change_avatar_modal: false, messages: {}, errors: false })

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
        button_loading: false,
        avatar_loading: false
    })
}

function newMessage(state, message) {
    return Object.assign({}, state, {
        errors: false, messages: format_data(message),
        button_loading: false,
        avatar_loading: false
    })
}

function clearMessage(state) {
    return Object.assign({}, state, {
        errors: false, messages: {}
    })
}

function format_data(e) {
    if (e.isAxiosError && e.response && e.response.data && e.response.data.errors) {
        return e.response.data.errors
    }
    else if (typeof (e) === "string") {
        return { message: [e] }
    }
    else if (e.name === "Error") {
        return { error: [e.message] }
    }
    else {
        return e
    }
}