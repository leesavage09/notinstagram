import { createSlice } from '@reduxjs/toolkit'
import { profileActions } from './profile_slice'
import merge from 'lodash/merge'

const slice_name = 'normalized_posts'

const normalizedPostsSlice = createSlice({
    name: slice_name,
    initialState: {},
    extraReducers: {
        [profileActions.fetchDetails.fulfilled]: (state, action) => {
            if (action.payload.posts) {
                merge(state, action.payload.posts);
            }
        }
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
