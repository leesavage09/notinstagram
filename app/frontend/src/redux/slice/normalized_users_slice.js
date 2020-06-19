import { createSlice } from '@reduxjs/toolkit'
import { exploreActions } from './explore_slice'
import { profileActions } from './profile_slice'
import { followersActions } from './followers_slice'
import merge from 'lodash/merge'
import { PostActions } from './post_slice';
import { FeedActions } from './feed_slice';
import { sessionActions } from './session_slice';

const slice_name = 'normalized_users'

const normalizedUsersSlice = createSlice({
    name: slice_name,
    initialState: {},
    extraReducers: {
        [profileActions.fetchUserActivityDetails.fulfilled]: (state, action) => {
            const allUsers = merge({}, action.payload.users, { [action.payload.user.id]: action.payload.user })
            merge(state, allUsers);
        },
        [exploreActions.searchUsers.fulfilled]: mergeUsers,
        [followersActions.fetchFollowers.fulfilled]: mergeUsers,
        [followersActions.fetchFollowings.fulfilled]: mergeUsers,
        [profileActions.fetchHashtagActivityDetails.fulfilled]: mergeUsers,
        [PostActions.createPost.fulfilled]: mergeUsers,
        [PostActions.showPost.fulfilled]: mergeUsers,
        [FeedActions.getFeed.fulfilled]: mergeUsers,
        [exploreActions.getRandomPosts.fulfilled]: mergeUsers,
        [sessionActions.getNotifications.fulfilled]: mergeUsers,
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

function mergeUsers(state, action) {
    const users = action.payload.users
    if (users) {
        merge(state, users);
    }
}