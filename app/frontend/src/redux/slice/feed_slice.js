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
        no_more_posts: false,
        post_ids: [],
    },
    extraReducers: {
        [getFeed.pending]: state => { state.loading = true },
        [getFeed.fulfilled]: (state, action) => {
            state.loading = false
            if (action.payload.post_ids.length === 0) state.no_more_posts = true;
            state.post_ids = Array.from(new Set([...state.post_ids, ...action.payload.post_ids]));
        },
        [getFeed.rejected]: state => { state.loading = false },
    }
})

export default FeedSlice

FeedSlice.actions.getFeed = getFeed
export const FeedActions = FeedSlice.actions

export const FeedSelector = {
    post_ids: () => state => state[slice_name].post_ids,
    loading: () => state => state[slice_name].loading,
    no_more_posts: () => state => state[slice_name].no_more_posts,
}