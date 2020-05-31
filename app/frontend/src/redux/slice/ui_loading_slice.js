import { createSlice } from '@reduxjs/toolkit'
import { sessionActions } from './session_slice'

const slice_name = 'ui-loading'

const uiLoadingSlice = createSlice({
    name: slice_name,
    initialState: {
        disable_buttons: false,
        avatar_loading_spinner: false,
    },
    extraReducers: {
        [sessionActions.login.pending]: state => { state.disable_buttons = true },
        [sessionActions.logout.pending]: state => { state.disable_buttons = true },
        [sessionActions.createUser.pending]: state => { state.disable_buttons = true },
        [sessionActions.updateUser.pending]: state => { state.disable_buttons = true },
        [sessionActions.updatePassword.pending]: state => { state.disable_buttons = true },

        [sessionActions.login.fulfilled]: state => { state.disable_buttons = false },
        [sessionActions.logout.fulfilled]: state => { state.disable_buttons = false },
        [sessionActions.createUser.fulfilled]: state => { state.disable_buttons = false },
        [sessionActions.updateUser.fulfilled]: state => { state.disable_buttons = false },
        [sessionActions.updatePassword.fulfilled]: state => { state.disable_buttons = false },
        [sessionActions.login.rejected]: state => { state.disable_buttons = false },
        [sessionActions.logout.rejected]: state => { state.disable_buttons = false },
        [sessionActions.createUser.rejected]: state => { state.disable_buttons = false },
        [sessionActions.updateUser.rejected]: state => { state.disable_buttons = false },
        [sessionActions.updatePassword.rejected]: state => { state.disable_buttons = false },

        [sessionActions.updateAvatar.pending]: state => { state.avatar_loading_spinner = true },
        [sessionActions.removeAvatar.pending]: state => { state.avatar_loading_spinner = true },

        [sessionActions.updateAvatar.fulfilled]: state => { state.avatar_loading_spinner = false },
        [sessionActions.removeAvatar.fulfilled]: state => { state.avatar_loading_spinner = false },
        [sessionActions.updateAvatar.rejected]: state => { state.avatar_loading_spinner = false },
        [sessionActions.removeAvatar.rejected]: state => { state.avatar_loading_spinner = false },

    }
})
export default uiLoadingSlice

export const uiLoadingActions = uiLoadingSlice.actions

export const uiLoadingSelector = {
    disable_buttons: () => state => state[slice_name].disable_buttons,
    avatar_loading_spinner: () => state => state[slice_name].avatar_loading_spinner
}