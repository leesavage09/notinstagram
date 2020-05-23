import * as UsersSelector from '../normalized/users_selector'

export const discoveredUsers = () => {
    return (state) => {
        const users = []
        state.page.explore.users.forEach(id => {
            const user = UsersSelector.getUser(id)(state)
            users.push(user)
        });
        return users
    }
}