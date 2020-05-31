import { createSlice } from '@reduxjs/toolkit'
import merge from 'lodash/merge'

const slice_name = 'image-editor'

const _default = {
    selected_image: null,
    processed_image: null,
    image_processes: {
        fitWidth: false,
        rotation: 0,
        filter: 'Normal'
    }
}

const imageEditorSlice = createSlice({
    name: slice_name,
    initialState: _default,
    reducers: {
        imageSelectSuccess: (state, action) => {
            merge(state, _default)
            state.selected_image = action.payload
            return state
        },
        imageSelectFailure: state => state,
        imageSavedSuccess: (state, action) => {
            state.processed_image = action.payload
        },
        updateFilters: (state, action) => {
            state.image_processes = merge(state.image_processes, action.payload)
        },
    }
})

export default imageEditorSlice

export const imageEditorActions = imageEditorSlice.actions

export const imageEditorSelector = {
    selectedImage: () => state => state[slice_name].selected_image,
    processedImage: () => state => state[slice_name].processed_image,
    imageProcesses: () => state => state[slice_name].image_processes,
}