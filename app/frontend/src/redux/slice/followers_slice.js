import { createSlice } from '@reduxjs/toolkit'
import * as ApiUtil from '../../util/api'

const slice_name = 'followers'

const fetchFollowers = ApiUtil.createSimpelAsyncThunk(
    `${slice_name}/fetchFollowers`,
    ApiUtil.getFollowers
)

const fetchFollowings = ApiUtil.createSimpelAsyncThunk(
    `${slice_name}/fetchFollowings`,
    ApiUtil.getFollowings
)

const follow = ApiUtil.createSimpelAsyncThunk(
    `${slice_name}/follow`,
    ApiUtil.follow
)

const unfollow = ApiUtil.createSimpelAsyncThunk(
    `${slice_name}/unfollow`,
    ApiUtil.unfollow
)

const followersSlice = createSlice({
    name: slice_name,
    initialState: {
        loading: {},
        follower_ids: [],
        following_ids: [],
    },
    extraReducers: {
        [fetchFollowers.pending]: (state) => {
            state.follower_ids = []
        },
        [fetchFollowers.fulfilled]: (state, action) => {
            state.follower_ids = action.payload.ids
        },
        [fetchFollowers.rejected]: state => {
            state.follower_ids = []
        },
        [fetchFollowings.pending]: (state) => {
            state.following_ids = []
        },
        [fetchFollowings.fulfilled]: (state, action) => {
            state.following_ids = action.payload.ids
        },
        [fetchFollowings.rejected]: state => {
            state.following_ids = []
        },
        [follow.pending]: (state, action) => { state.loading[action.meta.arg]= true },
        [unfollow.pending]: (state, action) => { state.loading[action.meta.arg]= true }, 
        [follow.fulfilled]: (state, action) => { state.loading[action.meta.arg]= false },
        [follow.rejected]: (state, action) => { state.loading[action.meta.arg]= false },
        [unfollow.fulfilled]: (state, action) => { state.loading[action.meta.arg]= false },
        [unfollow.rejected]: (state, action) => { state.loading[action.meta.arg]= false },
    }
})
export default followersSlice

followersSlice.actions.fetchFollowers = fetchFollowers
followersSlice.actions.fetchFollowings = fetchFollowings
followersSlice.actions.follow = follow
followersSlice.actions.unfollow = unfollow

export const followersActions = followersSlice.actions

export const followersSelector = {
    followerIDs: () => state => state[slice_name].follower_ids,
    followingIDs: () => state => state[slice_name].following_ids,
    loading: () => state => state[slice_name].loading,
}