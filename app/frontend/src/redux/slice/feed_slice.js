import { createSlice } from '@reduxjs/toolkit'
import * as ApiUtil from '../../util/api'

const slice_name = 'feed'

const getFeed = ApiUtil.createSimpelAsyncThunk(
    `${slice_name}/getFeed`,
    ApiUtil.getFeed
)

const FeedSlice = createSlice({
    name: slice_name,
    initialState: {
        loading: false,
        post_ids: [],
    },
    extraReducers: {
        [getFeed.pending]: state => { state.loading = true },
        [getFeed.fulfilled]: (state, action) => {
            state.loading = false
            state.post_ids = action.payload.post_ids
        },
        [getFeed.rejected]: state => { state.loading = false },
    }
})

export default FeedSlice

FeedSlice.actions.getFeed = getFeed
export const FeedActions = FeedSlice.actions

export const FeedSelector = {
    post_ids: () => state => state[slice_name].post_ids,
    loading: () => state => state[slice_name].loading
}