import * as Actions from './signup_actions'

const _state = {
    loading: false,
    user: [],
    errors: []
};

const signupReducer = (state = _state, action) => {
    Object.freeze(state)

    switch (action.type) {
        case Actions.CREATE_USER_REQUEST:
            return {
                ...state,
                loading: true,
                errors: []
            }
        case Actions.CREATE_USER_SUCCESS:
            return {
                loading: false,
                user: action.user,
                errors: []
            }
        case Actions.CREATE_USER_FAILURE:
            return {
                loading: false,
                user: [],
                errors: action.error
            }
        default:
            return state;
    }

}

export default signupReducer;