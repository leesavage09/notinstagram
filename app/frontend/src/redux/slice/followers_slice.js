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

const followUser = ApiUtil.createSimpelAsyncThunk(
    `${slice_name}/followUser`,
    ApiUtil.followUser
)

const unfollowUser = ApiUtil.createSimpelAsyncThunk(
    `${slice_name}/unfollowUser`,
    ApiUtil.unfollowUser
)

const followHashtag = ApiUtil.createSimpelAsyncThunk(
    `${slice_name}/followHashtag`,
    ApiUtil.followHashtag
)

const unfollowHashtag = ApiUtil.createSimpelAsyncThunk(
    `${slice_name}/unfollowHashtag`,
    ApiUtil.unfollowHashtag
)

const followersSlice = createSlice({
    name: slice_name,
    initialState: {
        loadingUser: {},
        loadingHashtag: {},
        follower_ids: [],
        following_ids: [],
    },
    extraReducers: {
        [fetchFollowers.pending]: clearFollowers,
        [fetchFollowers.fulfilled]: setFollowers,
        [fetchFollowers.rejected]: clearFollowers,

        [fetchFollowings.pending]: clearFollowings,
        [fetchFollowings.fulfilled]: setFollowings,
        [fetchFollowings.rejected]: clearFollowings,

        [followUser.pending]: loadingUserTrue,
        [followUser.fulfilled]: loadingUserFalse,
        [followUser.rejected]: loadingUserFalse,

        [unfollowUser.pending]: loadingUserTrue,
        [unfollowUser.fulfilled]: loadingUserFalse,
        [unfollowUser.rejected]: loadingUserFalse,

        [followHashtag.pending]: loadingHashtagTrue,
        [followHashtag.fulfilled]: loadingHashtagFalse,
        [followHashtag.rejected]: loadingHashtagFalse,

        [unfollowHashtag.pending]: loadingHashtagTrue,
        [unfollowHashtag.fulfilled]: loadingHashtagFalse,
        [unfollowHashtag.rejected]: loadingHashtagFalse,
    }
})
export default followersSlice

followersSlice.actions.fetchFollowers = fetchFollowers
followersSlice.actions.fetchFollowings = fetchFollowings
followersSlice.actions.followUser = followUser
followersSlice.actions.unfollowUser = unfollowUser
followersSlice.actions.followHashtag = followHashtag
followersSlice.actions.unfollowHashtag = unfollowHashtag

export const followersActions = followersSlice.actions

export const followersSelector = {
    followerIDs: () => state => state[slice_name].follower_ids,
    followingIDs: () => state => state[slice_name].following_ids,
    loadingUser: () => state => state[slice_name].loadingUser,
    loadingHashtag: () => state => state[slice_name].loadingHashtag,
}

function loadingHashtagTrue(state, action) {
    state.loadingHashtag[action.meta.arg] = true
}

function loadingHashtagFalse(state, action) {
    state.loadingHashtag[action.meta.arg] = false
}

function loadingUserTrue(state, action) {
    state.loadingUser[action.meta.arg] = true
}

function loadingUserFalse(state, action) {
    state.loadingUser[action.meta.arg] = false
}

function clearFollowers(state) {
    state.follower_ids = []
}

function setFollowers(state, action) {
    state.follower_ids = action.payload.ids
}

function clearFollowings(state) {
    state.following_ids = []
}

function setFollowings(state, action) {
    state.following_ids = action.payload.ids
}