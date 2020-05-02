export const loggedInUser = state => {
    if (state.session && state.session.user) {
        return state.session.user
    } else {
        return null
    }
}

export const errorsMessages = state => {
    const errors = []
    Object.keys(state.errors.user).forEach(key => {
        // state.errors.user[key].forEach(message => {
        //     errors.push(message)
        // })
        // just the first error
        errors.push( state.errors.user[key][0] )
    })
    return errors;
}

// export const errorTypes = state => {
//     return Object.keys(state.errors.user)
// }