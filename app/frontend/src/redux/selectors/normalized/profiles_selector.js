export const getProfile = (id) => {
    return state => state.normalized.users[id]
}