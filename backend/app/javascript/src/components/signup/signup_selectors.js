
export const signedUpUser = (state) => {
    return state.signup.user;
}

export const errorsMessages = (state) => {
    const errors = []
    Object.keys(state.signup.errors).forEach(key => {
        state.signup.errors[key].forEach(message => {
            errors.push(message)
        }) 
    })
    return errors;
}

export const errorTypes = (state) => {
    return Object.keys(state.signup.errors)
}

export const loading = (state) => {
    return state.signup.loading
}