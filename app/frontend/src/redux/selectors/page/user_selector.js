export const user = () => {
    return (state) => {
        return state.page.user.user
    }
}

export const isLoading = () => {
    return (state) => {
        return state.page.user.loading
    }
}