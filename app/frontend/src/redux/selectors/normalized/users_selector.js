export const getUser = (id) => {
    return state => state.normalized.users[id]
}