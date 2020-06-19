import { createSlice } from '@reduxjs/toolkit'

const slice_name = 'modal'

const modalSlice = createSlice({
    name: slice_name,
    initialState: {
        show_change_avatar_modal: false,
        show_logout_modal: false,
        show_DM_modal: false,
        show_save_modal: false,
    },
    reducers: {
        showChangeAvatarModal: (state, action) => {
            state.show_change_avatar_modal = action.payload
        },
        showLogOutModal: (state, action) => {
            state.show_logout_modal = action.payload
        },
        showDMModal: (state, action) => {
            state.show_DM_modal = action.payload
        },
        showSaveModal: (state, action) => {
            state.show_save_modal = action.payload
        }
    }
})

export default modalSlice

export const modalActions = modalSlice.actions

export const modalSelector = {
    changeAvatarModalVisible: () => {
        return state => state[slice_name].show_change_avatar_modal;
    },
    logOutModalVisible: () => {
        return state => state[slice_name].show_logout_modal;
    },
    DMModalVisible:()=>{
        return state => state[slice_name].show_DM_modal;
    },
    saveModalVisible:()=>{
        return state => state[slice_name].show_save_modal;
    }
}