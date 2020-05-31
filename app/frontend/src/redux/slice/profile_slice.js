import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as ApiUtil from '../../util/api'

const slice_name = 'profile'

const fetchDetails = createAsyncThunk(
    `${slice_name}/fetchDetails`,
    async (id, thunkAPI) => {
        try {
            const response = await ApiUtil.getUser(id)
            return response.data
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
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