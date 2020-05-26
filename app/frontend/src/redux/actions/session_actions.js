import * as ActionTypes from './action_types'
import { Utilitys as ImageUtil } from '../../util/image'
import * as AmazonS3 from '../../util/amazon_s3'
import * as ImageSelector from '../selectors/component/image_selector'
import * as SessionSelector from '../selectors/session_selector'
import * as SessionActions from './session_actions'
import * as ApiUtil from '../../util/api'

export const loginUser = (user) => {
    return (dispatch) => {
        dispatch(loginRequest())

        ApiUtil.loginUser(user.username, user.password)
            .then(r => dispatch(loginSuccess(r.data)))
            .catch(e => {
                dispatch(loginFailure(e))
            })
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch(logoutRequest())

        ApiUtil.logoutUser()
            .then(r => dispatch(logoutSuccess(r.data)))
            .catch(e => {
                dispatch(logoutFailure(e))
            })
    }
}

export const loginRequest = () => {
    return {
        type: ActionTypes.LOGIN_REQUEST
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

export const logoutRequest = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST
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
        dispatch(createUserRequest())

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
        dispatch(updateUserRequest())

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
            dispatch(updatePasswordRequest())

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

export const updateUserAvatar = () => {
    return (dispatch, getState) => {
        const img = ImageSelector.processedImage()(getState())
        const user = SessionSelector.loggedInUser()(getState())

        dispatch(updateUserAvatarRequest())

        Promise.all([
            ImageUtil.createFileWithImage(img),
            ApiUtil.getPresignedUrlForUserAvatar()
        ])
            .then(v => {
                return AmazonS3.sendBlobToAmazonS3(v[0], v[1].data)
            })
            .then(imageUrl => {
                return ApiUtil.updateUser({ ...user, image_url: imageUrl })
            })
            .then(responce => {
                dispatch(updateUserAvatarSuccess(responce.data))
            })
            .catch(e => {
                dispatch(updateUserAvatarFailure(e))
            })
    }
}
export const removeUserAvatar = () => {
    return (dispatch, getState) => {
        const user = SessionSelector.loggedInUser()(getState())
        dispatch(removeUserAvatarRequest())

        ApiUtil.updateUser({ ...user, image_url: null })
        .then(responce => {
            dispatch(removeUserAvatarSuccess(responce.data))
        })
        .catch(e => {
            dispatch(removeUserAvatarFailure(e))
        })
    }
}



export const createUserRequest = () => {
    return {
        type: ActionTypes.CREATE_USER_REQUEST
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

export const updateUserRequest = () => {
    return {
        type: ActionTypes.UPDATE_USER_REQUEST
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

export const updatePasswordRequest = () => {
    return {
        type: ActionTypes.UPDATE_PASSWORD_REQUEST
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

export const updateUserAvatarRequest = () => {
    return {
        type: ActionTypes.UPDATE_USER_AVATAR_REQUEST
    }
}

const updateUserAvatarSuccess = (user) => {
    return {
        type: ActionTypes.UPDATE_USER_AVATAR_SUCCESS,
        payload: user
    }
}

const updateUserAvatarFailure = (errors) => {
    return {
        type: ActionTypes.UPDATE_USER_AVATAR_FAILURE,
        payload: errors
    }
}

export const removeUserAvatarRequest = () => {
    return {
        type: ActionTypes.REMOVE_USER_AVATAR_REQUEST
    }
}

const removeUserAvatarSuccess = (user) => {
    return {
        type: ActionTypes.REMOVE_USER_AVATAR_SUCCESS,
        payload: user
    }
}

const removeUserAvatarFailure = (errors) => {
    return {
        type: ActionTypes.REMOVE_USER_AVATAR_FAILURE,
        payload: errors
    }
}