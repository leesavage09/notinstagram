export const loggedInUser = state => {
    if (state.session && state.session.user) {
        return state.session.user
    } else {
        return null
    }
}

export const signupErrorsMessages = state => {
    const errors = []
    Object.keys(state.errors.user.signup).forEach(key => {
        state.errors.user.signup[key].forEach(message => {
            errors.push(message)
        })
    })
    return errors;
}

export const signupErrorTypes = state => {
    return Object.keys(state.errors.user.signup)
}

export const updateErrorsMessages = state => {
    const errors = []
    Object.keys(state.errors.user.update).forEach(key => {
        state.errors.user.update[key].forEach(message => {
            errors.push(message)
        })
    })
    return errors;
}

export const updateErrorTypes = state => {
    return Object.keys(state.errors.user.update)
}