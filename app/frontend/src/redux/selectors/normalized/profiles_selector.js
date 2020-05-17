export const getProfile = (id) => {
    return state => state.normalized.profiles[id]
}