import { createSlice } from '@reduxjs/toolkit'
import * as ApiUtil from '../../util/api'

const slice_name = 'profile'

const fetchUserActivityDetails = ApiUtil.createSimpelAsyncThunk(
    `${slice_name}/fetchUserActivityDetails`,
    ApiUtil.getUserDetails
)

const fetchHashtagActivityDetails = ApiUtil.createSimpelAsyncThunk(
    `${slice_name}/fetchHashtagActivityDetails`,
    ApiUtil.getHashtagDetails
)

const profileSlice = createSlice({
    name: slice_name,
    initialState: {}
})
export default profileSlice

profileSlice.actions.fetchUserActivityDetails = fetchUserActivityDetails
profileSlice.actions.fetchHashtagActivityDetails = fetchHashtagActivityDetails

export const profileActions = profileSlice.actions