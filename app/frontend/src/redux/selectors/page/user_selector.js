export const user_id = () => {
    return (state) => {
        return state.page.user.user_id
    }
}

//TODO not in use, remove?
export const isLoading = () => {
    return (state) => {
        return state.page.user.loading
    }
}