import { createSlice } from '@reduxjs/toolkit'
import { exploreActions } from './explore_slice'
import { profileActions } from './profile_slice'
import merge from 'lodash/merge'

const slice_name = 'normalized_users'

const normalizedUsersSlice = createSlice({
    name: slice_name,
    initialState: {},
    extraReducers: {
        [exploreActions.searchUsers.fulfilled]: (state, action) => {
            if (action.payload.users) {
                merge(state, action.payload.users);
            }
        },
        [profileActions.fetchDetails.fulfilled]: (state, action) => {
            const allUsers = merge({}, action.payload.users, { [action.payload.user.id]: action.payload.user })
            merge(state, allUsers);
        }
    }
})

export default normalizedUsersSlice

export const normalizedUsersSelector = {
    getUser: (id) => state => state[slice_name][id],
    getUsers: (ids) => state => {
        const users = []
        ids.forEach(id => {
            const user = state[slice_name][id]
            users.push(user)
        });
        return users
    }
}
