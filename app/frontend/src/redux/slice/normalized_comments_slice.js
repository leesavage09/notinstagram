import { createSlice } from '@reduxjs/toolkit'
import { profileActions } from './profile_slice'
import merge from 'lodash/merge'

const slice_name = 'normalized_comments'

const normalizedCommentsSlice = createSlice({
    name: slice_name,
    initialState: {},
    extraReducers: {
        [profileActions.fetchDetails.fulfilled]: (state, action) => {
            if (action.payload.comments) {
                merge(state, action.payload.comments);
            }
        }
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
