import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as ApiUtil from '../../util/api'

const slice_name = 'explore'

const searchUsers = createAsyncThunk(
    `${slice_name}/searchUsers`,
    async (searchQuery, thunkAPI) => {
        try {
            const response = await ApiUtil.findUser(searchQuery)
            return response.data
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

const exploreSlice = createSlice({
    name: slice_name,
    initialState: {
        loading: false,
        users: [],
        hashtags: []
    },
    extraReducers: {
        [searchUsers.pending]: state => {
            state.loading = true
        },
        [searchUsers.fulfilled]: (state, action) => {
            state.users = action.payload.users ? Object.keys(action.payload.users) : []
            state.loading = false
        },
        [searchUsers.rejected]: state => {
            state.loading = false
        }
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