import * as Signup_actions from './signup_actions'

const _defaultState = {
    newUser: {
        name: 'name',
        email: 'email@address',
        username: 'username',
        password: 'password'
    }
};

const signupReducer = (state = _defaultState, action) => {
    Object.freeze(state)
    let nextState = {}


    switch (action.type) {
        case Signup_actions.CREATE_USER:
            nextState['newUser'] = action.user
            return nextState;
        default:
            return state;
    }

}

export default signupReducer;