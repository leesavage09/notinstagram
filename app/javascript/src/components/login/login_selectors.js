
export const loginUpUser = (state) => {
    return state.login.user;
}

export const errorsMessages = (state) => {
    const errors = []
    Object.keys(state.login.errors).forEach(key => {
        state.login.errors[key].forEach(message => {
            errors.push(message)
        }) 
    })
    return errors;
}

export const loading = (state) => {
    return state.login.loading
}