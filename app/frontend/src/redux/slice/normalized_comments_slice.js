import { createSlice } from '@reduxjs/toolkit'
import { profileActions } from './profile_slice'
import merge from 'lodash/merge'
import { PostActions } from './post_slice';
import { FeedActions } from './feed_slice';
import { exploreActions } from './explore_slice';
import { sessionActions } from './session_slice';

const slice_name = 'normalized_comments'

const normalizedCommentsSlice = createSlice({
    name: slice_name,
    initialState: {},
    extraReducers: {
        [profileActions.fetchUserActivityDetails.fulfilled]: mergeComments,
        [profileActions.fetchHashtagActivityDetails.fulfilled]: mergeComments,
        [PostActions.createPost.fulfilled]: mergeComments,
        [PostActions.showPost.fulfilled]: mergeComments,
        [FeedActions.getFeed.fulfilled]: mergeComments,
        [exploreActions.getRandomPosts.fulfilled]: mergeComments,
        [sessionActions.getNotifications.fulfilled]: mergeComments,
    }
})

export default normalizedCommentsSlice

export const normalizedCommentsSelector = {
    getComment: (id) => state => state[slice_name][id],
    getComments: (ids) => state => {
        const comments = []
        ids.forEach(id => {
            comments.push(state[slice_name][id])
        });
        return comments
    }
}

function mergeComments(state, action) {
    if (action.payload.comments) {
        merge(state, action.payload.comments);
    }
}