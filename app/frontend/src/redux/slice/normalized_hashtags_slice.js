import { createSlice } from '@reduxjs/toolkit'
import { exploreActions } from './explore_slice'
import { profileActions } from './profile_slice'
import merge from 'lodash/merge'

const slice_name = 'normalized_Hashtags'

const normalizedHashtagsSlice = createSlice({
    name: slice_name,
    initialState: {},
    extraReducers: {
        [profileActions.fetchHashtagActivityDetails.fulfilled]: mergeHashtag,
    }
})

export default normalizedHashtagsSlice

export const normalizedHashtagsSelector = {
    getHashtag: (id) => state => state[slice_name][id],
    getHashtags: (ids) => state => {
        const Hashtags = []
        ids.forEach(id => {
            const user = state[slice_name][id]
            Hashtags.push(user)
        });
        return Hashtags
    }
}

function mergeHashtag(state, action) {
    if (action.payload.hashtag) {
        merge(state, { [action.payload.hashtag.name]: action.payload.hashtag });
    }
}