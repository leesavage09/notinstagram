import * as Actions from './login_actions'

const _state = {
    loading: false,
    user: [],
    errors: []
};

const loginReducer = (state = _state, action) => {
    Object.freeze(state)

    switch (action.type) {
        case Actions.LOGIN_USER_REQUEST:
            return {
                ...state,
                loading: true,
                errors: []
            }
        case Actions.LOGIN_USER_SUCCESS:
            return {
                loading: false,
                user: action.user,
                errors: []
            }
        case Actions.LOGIN_USER_FAILURE:
            return {
                loading: false,
                user: [],
                errors: action.error
            }
        default:
            return state;
    }

}

export default loginReducer;