export const errorsMessages = (state) => {
    const errors = []
    Object.keys(state.errors.session.signup).forEach(key => {
        state.errors.session.signup[key].forEach(message => {
            errors.push(message)
        })
    })
    return errors;
}

export const errorTypes = (state) => {
    return Object.keys(state.errors.session.signup)
}