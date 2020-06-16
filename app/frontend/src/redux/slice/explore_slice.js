import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as ApiUtil from '../../util/api'

const slice_name = 'explore'

const searchUsers = ApiUtil.createSimpelAsyncThunk(
    `${slice_name}/searchUsers`,
    ApiUtil.findUser
)

const getRandomPosts = ApiUtil.createSimpelAsyncThunk(
    `${slice_name}/getRandomPosts`,
    ApiUtil.getRandomPosts
)

const exploreSlice = createSlice({
    name: slice_name,
    initialState: {
        loading: false,
        users: [],
        hashtags: [],
        posts: [],
        loading_posts: false,
    },
    reducers: {
        cancelSearch: state => { state.users = [] }
    },
    extraReducers: {
        [searchUsers.pending]: loadingTrue,
        [searchUsers.fulfilled]: usersFound,
        [searchUsers.rejected]: loadingFalse,
        [getRandomPosts.pending]: loadingPostsTrue,
        [getRandomPosts.fulfilled]: postsFound,
        [getRandomPosts.rejected]: loadingPostsFalse
    }
})

export default exploreSlice

exploreSlice.actions.searchUsers = searchUsers
exploreSlice.actions.getRandomPosts = getRandomPosts

export const exploreActions = exploreSlice.actions

export const exploreSelector = {
    discoveredUsers: () => state => {
        const ids = []
        state[slice_name].users.forEach(id => {
            ids.push(id)
        });
        return ids
    },
    loading: () => state => state[slice_name].loading,
    posts: () => state => state[slice_name].posts,
    loading_posts: () => state => state[slice_name].loading_posts,
}

function loadingTrue(state) {
    state.loading = true
}
function loadingFalse(state) {
    state.loading = true
}
function usersFound(state, action) {
    state.users = action.payload.users ? Object.keys(action.payload.users) : []
    state.loading = false
}

function loadingPostsTrue(state) {
    state.loading_posts = true
}
function loadingPostsFalse(state) {
    state.loading_posts = false
}
function postsFound(state, action) {
    state.posts = action.payload.posts ? Object.keys(action.payload.posts) : []
    state.loading_posts = false
}