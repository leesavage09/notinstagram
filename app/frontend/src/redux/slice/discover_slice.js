import { createSlice } from '@reduxjs/toolkit'
import * as ApiUtil from '../../util/api'

const slice_name = 'discover'

const fetchUsers = ApiUtil.createSimpelAsyncThunk(
    `${slice_name}/fetchUsers`,
    ApiUtil.discoverUsers
)

const discoverSlice = createSlice({
    name: slice_name,
    initialState: {
        user_ids: []
    },
    extraReducers: {
        [fetchUsers.fulfilled]: (state, action) => {
            state.user_ids = action.payload.users ? Object.keys(action.payload.users) : []
        }
    }
})
export default discoverSlice

discoverSlice.actions.fetchUsers = fetchUsers
export const discoverActions = discoverSlice.actions

export const discoverSelector = {
    user_ids: () => state => state[slice_name].user_ids
}