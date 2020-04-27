import * as ActionTypes from '../actions/action_types'

const _nullErrors = {
};

const SessionErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
        case ActionTypes.LOGIN_USER_FAILURE:
            return action.error
        case ActionTypes.LOGOUT_FAILURE:
            return action.error
        default:
            return _nullErrors;
    }
};

export default SessionErrorsReducer