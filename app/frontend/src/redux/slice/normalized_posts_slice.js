import { createSlice } from '@reduxjs/toolkit'
import { profileActions } from './profile_slice'
import merge from 'lodash/merge'
import { PostActions } from './post_slice';
import { FeedActions } from './feed_slice';

const slice_name = 'normalized_posts'

const normalizedPostsSlice = createSlice({
    name: slice_name,
    initialState: {},
    extraReducers: {
        [profileActions.fetchUserActivityDetails.fulfilled]: mergePosts,
        [profileActions.fetchHashtagActivityDetails.fulfilled]: mergePosts,
        [PostActions.createPost.fulfilled]: mergePost,
        [PostActions.showPost.fulfilled]: mergePost,
        [PostActions.likePost.fulfilled]: mergePost,
        [PostActions.unlikePost.fulfilled]: updatePost,
        [FeedActions.getFeed.fulfilled]: mergePosts,
    }
})

export default normalizedPostsSlice

export const normalizedPostsSelector = {
    getPost: (id) => state => state[slice_name][id],
    getPosts: (ids) => state => {
        const Posts = []
        ids.forEach(id => {
            Posts.push(state[slice_name][id])
        });
        return Posts
    }
}

function mergePosts(state, action) {
    if (action.payload.posts) {
        merge(state, action.payload.posts);
    }
}
function mergePost(state, action) {
    if (action.payload.post) {
        merge(state, { [action.payload.post.id]: action.payload.post });
    }
}
function updatePost(state, action) {
    if (action.payload.post && state[action.payload.post.id]) {
        state[action.payload.post.id] = action.payload.post
    }
}