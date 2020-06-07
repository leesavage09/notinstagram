import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as ApiUtil from '../../util/api'
import { imageEditorSelector } from '../slice/image_editor_slice'
import { Utilitys as ImageUtil } from '../../util/image'
import * as AmazonS3 from '../../util/amazon_s3'
import { profileActions } from '../slice/profile_slice'
import {followersActions} from '../slice/followers_slice'

const slice_name = 'session'

const login = ApiUtil.createSimpelAsyncThunk(
    `${slice_name}/login`,
    ApiUtil.loginUser
)

const logout = ApiUtil.createSimpelAsyncThunk(
    `${slice_name}/logout`,
    ApiUtil.logoutUser
)

const createUser =  ApiUtil.createSimpelAsyncThunk(
    `${slice_name}/createUser`,
    ApiUtil.createUser
)

const updateUser =  ApiUtil.createSimpelAsyncThunk(
    `${slice_name}/updateUser`,
    ApiUtil.updateUser
)

const updatePassword = createAsyncThunk(
    `${slice_name}/updatePassword`,
    async ({ user, oldPassword, newPassword, newPasswordConfirmation }, thunkAPI) => {
        if (newPassword !== newPasswordConfirmation) {
            return thunkAPI.rejectWithValue("Make sure both passwords match")
        }
        try {
            await ApiUtil.loginUser(user.username, oldPassword)
            const responce = await ApiUtil.updateUser({ ...user, password: newPassword })

            return responce.data
        } catch (e) {
            if (e.message.includes("401")) {
                return thunkAPI.rejectWithValue("Your old password was entered incorrectly")
            }
            else {
                return thunkAPI.rejectWithValue(e)
            }
        }
    }
)

const updateAvatar = createAsyncThunk(
    `${slice_name}/updateAvatar`,
    async (arg, thunkAPI) => {
        try {
            const img = imageEditorSelector.processedImage()(thunkAPI.getState())
            const user = sessionSelector.loggedInUser()(thunkAPI.getState())
            const p = await Promise.all([
                ImageUtil.createFileWithImage(img),
                ApiUtil.getPresignedUrlForUserAvatar()
            ])
            const imageUrl = await AmazonS3.sendBlobToAmazonS3(p[0], p[1].data)
            const responce = await ApiUtil.updateUser({ ...user, image_url: imageUrl })
            return responce.data
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

const removeAvatar = createAsyncThunk(
    `${slice_name}/removeAvatar`,
    async (arg, thunkAPI) => {
        try {
            const user = sessionSelector.loggedInUser()(thunkAPI.getState())
            const responce = await ApiUtil.updateUser({ ...user, image_url: null })
            return responce.data
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

const sessionSlice = createSlice({
    name: slice_name,
    initialState: {
        user: null
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => setUser(state, action.payload),
        [createUser.fulfilled]: (state, action) => setUser(state, action.payload),
        [updateUser.fulfilled]: (state, action) => setUser(state, action.payload),
        [updatePassword.fulfilled]: (state, action) => setUser(state, action.payload),
        [updateAvatar.fulfilled]: (state, action) => setUser(state, action.payload),
        [removeAvatar.fulfilled]: (state, action) => setUser(state, action.payload),
        [logout.fulfilled]: state => setUser(state, null),

        [profileActions.fetchDetails.fulfilled]: (state, action) => assign(state, action.payload.user),
        
        [followersActions.follow.fulfilled]: (state, action) => assign(state, action.payload),
        [followersActions.unfollow.fulfilled]: (state, action) => assign(state, action.payload),
    }
})
export default sessionSlice

function setUser(state, user) {
    state.user = user
}

function assign(state, user) {
    if (user.id === state.user.id) {
        Object.assign(state.user, user);
    }
}

sessionSlice.actions.login = login
sessionSlice.actions.createUser = createUser
sessionSlice.actions.updateUser = updateUser
sessionSlice.actions.updatePassword = updatePassword
sessionSlice.actions.updateAvatar = updateAvatar
sessionSlice.actions.removeAvatar = removeAvatar
sessionSlice.actions.logout = logout

export const sessionActions = sessionSlice.actions

export const sessionSelector = {
    loggedInUser: () => state => state[slice_name].user
}