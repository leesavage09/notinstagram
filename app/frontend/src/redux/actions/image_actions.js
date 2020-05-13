import * as ActionTypes from '../actions/action_types';

export const imageSelectSuccess = (img) => {
    return {
        type: ActionTypes.IMAGE_SELECT_SUCCESS,
        payload: img
    }
}

export const imageSelectFailure = (error) => {
    return {
        type: ActionTypes.IMAGE_SELECT_FAILURE,
        payload: error
    }
}

export const imageSavedSuccess = (img) => {
    return {
        type: ActionTypes.IMAGE_SAVED_SUCCESS,
        payload: img
    }
}

export const updateImageFilters = (process) => {
    return {
        type: ActionTypes.UPDATE_IMAGE_FILTERS,
        payload: process
    }
}