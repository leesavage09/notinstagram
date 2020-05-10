import * as ActionTypes from '../actions/action_types';
import * as UiActions from '../actions/ui_actions'
import axios from 'axios'
import * as ImageSelector from '../selectors/image_selector'
import { Utilitys } from '../../util/image'
import * as UserActions from './user_actions'
import * as SessionSelector from '../selectors/session_selector'

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

export const uploadSavedImage = () => {
    return (dispatch) => {
        dispatch(UiActions.createAsyncRequest())

        return axios.get('http://localhost:3000/api/jpg_uploads')
            .then((responce) => {
                dispatch(sendImageToAmazonS3(responce.data))
            })
            .catch((error) => {
                dispatch(uploadImageFailure({ presignedFetchError: error.message }))
            })

    }
}

const sendImageToAmazonS3 = (presignedData) => {
    return (dispatch, getState) => {
        const img = ImageSelector.processedImage(getState())
        Utilitys.createFileWithImage(img)
            .then((blob) => {
                const url = presignedData.url;
                const formData = new FormData();
                formData.append('key', presignedData.url_fields['key'])
                formData.append('acl', presignedData.url_fields['acl'])
                formData.append('success_action_status', presignedData.url_fields['success_action_status'])
                formData.append('policy', presignedData.url_fields['policy'])
                formData.append('x-amz-credential', presignedData.url_fields['x-amz-credential'])
                formData.append('x-amz-algorithm', presignedData.url_fields['x-amz-algorithm'])
                formData.append('x-amz-date', presignedData.url_fields['x-amz-date'])
                formData.append('x-amz-signature', presignedData.url_fields['x-amz-signature'])
                formData.append('file', blob)
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }

                return axios.post(url, formData, config).then((response) => {
                    const user = SessionSelector.loggedInUser(getState())
                    user.image_url = url + "/" + presignedData.url_fields['key']
                    console.log("updated User", user)
                    dispatch(UserActions.updateUser(user))
                        .then(()=>{
                            user.image_url = user.image_url+"?"+Math.random()
                            dispatch(uploadImageSuccess(user))
                        })
                }).catch(error => {
                    console.log(error)
                    dispatch(uploadImageFailure({ s3UploadError: error.message }))
                })
            })
    }
}

const uploadImageSuccess = (url) => {
    return {
        type: ActionTypes.UPLOAD_IMAGE_SUCCESS,
        payload: url
    }
}

const uploadImageFailure = (error) => {
    return {
        type: ActionTypes.UPLOAD_IMAGE_FAILURE,
        payload: error
    }
}