import { createSlice } from '@reduxjs/toolkit'
import * as ApiUtil from '../../util/api'

const slice_name = 'comment'

const createComment = ApiUtil.createSimpelAsyncThunk(
    `${slice_name}/createComment`,
    ApiUtil.createComment
)

const commentSlice = createSlice({
    name: slice_name,
    initialState: {}
})

export default commentSlice

commentSlice.actions.createComment = createComment
export const commentActions = commentSlice.actions