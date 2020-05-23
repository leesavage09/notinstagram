import * as ActionTypes from '../actions/action_types'

const _default = {
    errors: false,
    is_awaiting_async: false,
    messages: {},
    show_profile_photo_modal: false
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
        case ActionTypes.REMOVE_PROFILE_IMAGE_FAILURE:
        case ActionTypes.FOUND_PROFILES_FAILURE:
        case ActionTypes.GET_PROFILE_FAILURE:
            return newError(state, action.payload)

        case ActionTypes.CREATE_USER_SUCCESS:
        case ActionTypes.LOGOUT_SUCCESS:
        case ActionTypes.LOGIN_SUCCESS:
        case ActionTypes.FOUND_PROFILES_SUCCESS:
        case ActionTypes.GET_PROFILE_SUCCESS:
            return Object.assign({}, state, { is_awaiting_async: false })

        case ActionTypes.UPDATE_USER_SUCCESS:
            return newMessage(state, "Profile saved")

        case ActionTypes.UPDATE_PROFILE_IMAGE_SUCCESS:
            return newMessage(state, "Profile photo added")

        case ActionTypes.REMOVE_PROFILE_IMAGE_SUCCESS:
            return newMessage(state, "Profile photo removed")

        case ActionTypes.UPDATE_PASSWORD_SUCCESS:
            return newMessage(state, "Password Updated")

        case ActionTypes.SHOW_PROFILE_PHOTO_MODAL:
            return Object.assign({}, state, { show_profile_photo_modal: true, messages: {}, errors: false })

        case ActionTypes.HIDE_PROFILE_PHOTO_MODAL:
            return Object.assign({}, state, { show_profile_photo_modal: false, messages: {}, errors: false })

        case ActionTypes.BROWSER_ROUTE_CHANGED:
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