import { createSlice } from '@reduxjs/toolkit'
import * as ApiUtil from '../../util/api'

const slice_name = 'profile'

const fetchDetails = ApiUtil.createSimpelAsyncThunk(
    `${slice_name}/fetchDetails`,
    ApiUtil.getUser
)

const profileSlice = createSlice({
    name: slice_name,
    initialState: {
        user_id: null
    },
    extraReducers: {
        [fetchDetails.fulfilled]: (state, action) => {
            state.user_id = action.payload.user.id
        },
        [fetchDetails.rejected]: state => {
            state.user_id = null
        }
    }
})
export default profileSlice

profileSlice.actions.fetchDetails = fetchDetails

export const profileActions = profileSlice.actions

export const profileSelector = {
    user_id: () => state => state[slice_name].user_id
}