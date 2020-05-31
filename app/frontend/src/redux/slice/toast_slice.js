import { createSlice } from '@reduxjs/toolkit'
import { exploreActions } from './explore_slice'
import { sessionActions } from './session_slice'
import { profileActions } from './profile_slice'
import { imageEditorActions } from './image_editor_slice'

const slice_name = 'toast'

const toastSlice = createSlice({
    name: slice_name,
    initialState: {
        error: false,
        messages: {}
    },
    reducers: {
        clearMessages: state => clearMessages(state)
    },
    extraReducers: {
        [sessionActions.login.fulfilled]: state => clearMessages(state),
        [sessionActions.logout.fulfilled]: state => clearMessages(state),
        [sessionActions.createUser.fulfilled]: state => clearMessages(state),
        [sessionActions.updateUser.fulfilled]: state => newMessage(state, "Profile saved"),
        [sessionActions.updatePassword.fulfilled]: state => newMessage(state, "Password Updated"),
        [imageEditorActions.imageSelectSuccess]: state => clearMessages(state),
        [sessionActions.updateAvatar.fulfilled]: state => newMessage(state, "Profile photo added"),
        [sessionActions.removeAvatar.fulfilled]: state => newMessage(state, "Profile photo removed"),
        [exploreActions.searchUsers.fulfilled]: state => clearMessages(state),
        [profileActions.fetchDetails.fulfilled]: state => clearMessages(state),

        [sessionActions.login.rejected]: (state, action) => newActionError(state, action),
        [sessionActions.logout.rejected]: (state, action) => newActionError(state, action),
        [sessionActions.createUser.rejected]: (state, action) => newActionError(state, action),
        [sessionActions.updateUser.rejected]: (state, action) => newActionError(state, action),
        [sessionActions.updatePassword.rejected]: (state, action) => newActionError(state, action),
        [imageEditorActions.imageSelectFailure]: (state, action) => newActionError(state, action),
        [sessionActions.updateAvatar.rejected]: (state, action) => newActionError(state, action),
        [sessionActions.removeAvatar.rejected]: (state, action) => newActionError(state, action),
        [exploreActions.searchUsers.rejected]: (state, action) => newActionError(state, action),
        [profileActions.fetchDetails.rejected]: (state, action) => newActionError(state, action),
    }
})

export default toastSlice

export const toastActions = toastSlice.actions

export const toastSelector = {
    allErrors: () => state => state[slice_name].errors ? allMessages()(state) : [],
    allSuccesses: () => state => !state[slice_name].errors ? allMessages()(state) : [],
    allMessages: () => state => {
        const messages = []
        Object.keys(state[slice_name].messages).forEach(key => {
            state[slice_name].messages[key].forEach(message => {
                messages.push(message)
            })
        })
        return messages;
    }
}

function newActionError(state, action) {
    state.error = true
    state.messages = format_message(action.payload)
}

function newMessage(state, message) {
    state.error = false
    state.messages = format_message(message)
}

function clearMessages(state) {
    state.error = false
    state.messages = {}
}

function format_message(e) {
    if (e.isAxiosError && e.response && e.response.data && e.response.data.errors) {
        return e.response.data.errors
    }
    else if (typeof (e) === "string") {
        return { message: [e] }
    }
    else if (e.name === "Error") {
        return { error: [e.message] }
    }
    else {
        return e
    }
}