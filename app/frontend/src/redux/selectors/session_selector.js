export const loggedInUser = state => {
    if (state.session && state.session.user) {
        return state.session.user
    } else {
        return null
    }
}