export const loggedInUser = state => state.session.user

export const signupErrorsMessages = state => {
    const errors = []
    Object.keys(state.errors.session.signup).forEach(key => {
        state.errors.session.signup[key].forEach(message => {
            errors.push(message)
        })
    })
    return errors;
}

export const signupErrorTypes = state => {
    return Object.keys(state.errors.session.signup)
}