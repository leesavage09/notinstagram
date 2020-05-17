import * as ActionTypes from './action_types'
import * as UiActions from './ui_actions'
import { Utilitys as ImageUtil } from '../../util/image'
import * as AmazonS3 from '../../util/amazon_s3'
import * as ImageSelector from '../selectors/component/image_selector'
import * as SessionSelector from '../selectors/session_selector'
import * as SessionActions from './session_actions'
import * as ApiUtil from '../../util/api'

export const loginUser = (user) => {
    return (dispatch) => {
        dispatch(UiActions.asyncRequest())

        ApiUtil.loginUser(user.username, user.password)
            .then(r => dispatch(loginSuccess(r.data)))
            .catch(e => {
                dispatch(loginFailure(e))
            })
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch(UiActions.asyncRequest())

        ApiUtil.logoutUser()
            .then(r => dispatch(logoutSuccess(r.data)))
            .catch(e => {
                dispatch(logoutFailure(e))
            })
    }
}

export const loginSuccess = (user) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        payload: user
    }
}

const loginFailure = (errors) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        payload: errors
    }
}

const logoutSuccess = (user) => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS,
        payload: user
    }
}

const logoutFailure = (errors) => {
    return {
        type: ActionTypes.LOGOUT_FAILURE,
        payload: errors
    }
}

export const createUser = (user) => {
    return (dispatch) => {
        dispatch(UiActions.asyncRequest())

        ApiUtil.createUser(user)
            .then(r => {
                dispatch(createUserSuccess(r.data))
                dispatch(SessionActions.loginSuccess(r.data))
            })
            .catch(e => {
                dispatch(createUserFailure(e))
            })
    }
}

export const updateUser = (user) => {
    return (dispatch) => {
        dispatch(UiActions.asyncRequest())

        ApiUtil.updateUser(user)
            .then(r => dispatch(updateUserSuccess(r.data)))
            .catch(e => {
                dispatch(updateUserFailure(e))
            })
    }
}

export const updatePassword = (user, oldPassword, newPassword, newPasswordConfirmation) => {
    return (dispatch) => {
        if (newPassword !== newPasswordConfirmation) {
            dispatch(updatePasswordFailure("Make sure both passwords match"))
        }
        else {
            dispatch(UiActions.asyncRequest())

            ApiUtil.loginUser(user.username, oldPassword)
                .then(r => {
                    return ApiUtil.updateUser({ ...user, password: newPassword })
                })
                .then(r => {
                    dispatch(updatePasswordSuccess())
                })
                .catch(e => {
                    if (e.message.includes("401")) {
                        dispatch(updatePasswordFailure("Your old password was entered incorrectly"))
                    }
                    else {
                        dispatch(updatePasswordFailure(e))
                    }
                })
        }
    }
}

export const updateProfileImage = () => {
    return (dispatch, getState) => {
        const img = ImageSelector.processedImage()(getState())
        const user = SessionSelector.loggedInUser()(getState())

        dispatch(UiActions.asyncRequest())

        Promise.all([
            ImageUtil.createFileWithImage(img),
            ApiUtil.getPresignedUrlForProfileImage()
        ])
            .then(v => {
                return AmazonS3.sendBlobToAmazonS3(v[0], v[1].data)
            })
            .then(imageUrl => {
                return ApiUtil.updateUser({ ...user, image_url: imageUrl })
            })
            .then(responce => {
                dispatch(updateProfileImageSuccess(responce.data))
            })
            .catch(e => {
                dispatch(updateProfileImageFailure(e))
            })
    }
}
export const removeProfileImage = () => {
    return (dispatch, getState) => {
        const user = SessionSelector.loggedInUser()(getState())
        dispatch(UiActions.asyncRequest())

        ApiUtil.updateUser({ ...user, image_url: null })
        .then(responce => {
            dispatch(removeProfileImageSuccess(responce.data))
        })
        .catch(e => {
            dispatch(removeProfileImageFailure(e))
        })
    }
}

const createUserSuccess = (user) => {
    return {
        type: ActionTypes.CREATE_USER_SUCCESS,
        payload: user
    }
}

const createUserFailure = (errors) => {
    return {
        type: ActionTypes.CREATE_USER_FAILURE,
        payload: errors
    }
}

const updateUserSuccess = (user) => {
    return {
        type: ActionTypes.UPDATE_USER_SUCCESS,
        payload: user
    }
}

const updateUserFailure = (errors) => {
    return {
        type: ActionTypes.UPDATE_USER_FAILURE,
        payload: errors
    }
}

const updatePasswordSuccess = () => {
    return {
        type: ActionTypes.UPDATE_PASSWORD_SUCCESS
    }
}

const updatePasswordFailure = (errors) => {
    return {
        type: ActionTypes.UPDATE_PASSWORD_FAILURE,
        payload: errors
    }
}

const updateProfileImageSuccess = (user) => {
    return {
        type: ActionTypes.UPDATE_PROFILE_IMAGE_SUCCESS,
        payload: user
    }
}

const updateProfileImageFailure = (errors) => {
    return {
        type: ActionTypes.UPDATE_PROFILE_IMAGE_FAILURE,
        payload: errors
    }
}

const removeProfileImageSuccess = (user) => {
    return {
        type: ActionTypes.REMOVE_PROFILE_IMAGE_SUCCESS,
        payload: user
    }
}

const removeProfileImageFailure = (errors) => {
    return {
        type: ActionTypes.REMOVE_PROFILE_IMAGE_FAILURE,
        payload: errors
    }
}