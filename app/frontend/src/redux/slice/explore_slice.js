import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as ApiUtil from '../../util/api'

const slice_name = 'explore'

const searchUsers = ApiUtil.createSimpelAsyncThunk(
    `${slice_name}/searchUsers`,
    ApiUtil.findUser
)

const exploreSlice = createSlice({
    name: slice_name,
    initialState: {
        loading: false,
        users: [],
        hashtags: []
    },
    extraReducers: {
        [searchUsers.pending]: loadingTrue,
        [searchUsers.fulfilled]: usersFound,
        [searchUsers.rejected]: loadingFalse
    }
})

export default exploreSlice

exploreSlice.actions.searchUsers = searchUsers

export const exploreActions = exploreSlice.actions

export const exploreSelector = {
    discoveredUsers: () => state => {
        const ids = []
        state[slice_name].users.forEach(id => {
            ids.push(id)
        });
        return ids
    },
    loading: () => state => state[slice_name].loading
}

function loadingTrue(state) {
    state.loading = true
}
function loadingFalse(state) {
    state.loading = true
}
function usersFound(state, action) {
    state.users = action.payload.users ? Object.keys(action.payload.users) : []
    state.loading = false
}