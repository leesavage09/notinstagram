import * as ActionTypes from '../action_types'

const _nullErrors = {
    login: [],
    signup: []
};

const SessionErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
        case ActionTypes.CREATE_USER_FAILURE:
            return { ...state, signup: action.error }
        case ActionTypes.LOGIN_USER_FAILURE:
            return { ...state, login: action.error }
        case ActionTypes.CLEAR_ERRORS:
            return _nullErrors;
        default:
            return state;
    }
};

export default SessionErrorsReducer