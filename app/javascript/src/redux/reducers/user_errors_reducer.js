import * as ActionTypes from '../actions/action_types'

const _nullErrors = {
    signup: [],
    update: []
};

const SessionErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
        case ActionTypes.CREATE_USER_FAILURE:
            return { ...state, signup: action.error }
        case ActionTypes.UPDATE_USER_FAILURE:
            return { ...state, update: action.error }
        default:
            return _nullErrors;
    }
};

export default SessionErrorsReducer