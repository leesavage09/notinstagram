import axios from 'axios'
import * as ActionTypes from './action_types'
import * as UiActions from './ui_actions'

export const createUser = (user) => {
    return (dispatch) => {
        dispatch(UiActions.createAsyncRequest())
        return axios
            .post('http://localhost:3000/api/users/', { user: user })
            .then(response => {
                dispatch(createUserSuccess(response.data))
                return Promise.resolve()
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.errors) {
                    dispatch(createUserFailure(error.response.data.errors))
                }
                else {
                    dispatch(createUserFailure({ unknown: [error.message] }))
                }
                return Promise.reject(error)
            })
    }
}


export const updateUser = (user) => {
    return (dispatch) => {
        dispatch(UiActions.createAsyncRequest())
        return axios
            .patch(`http://localhost:3000/api/users/${user.id}`, { user: user })
            .then(response => {
                dispatch(updateUserSuccess(response.data))
                return Promise.resolve()
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.errors) {
                    dispatch(updateUserFailure(error.response.data.errors))
                }
                else {
                    dispatch(updateUserFailure({ unknown: [error.message] }))
                }
                return Promise.reject(error)
            })
    }
}

export const updatePassword = (user, oldPassword, newPassword, newPasswordConfirmation) => {
    return (dispatch) => {
        if (newPassword !== newPasswordConfirmation) {
            dispatch(updatePasswordFailure({ general: ["Make sure both passwords match"] }))
        }
        else {
            dispatch(UiActions.createAsyncRequest())
            axios
                .post('http://localhost:3000/api/session/', {
                    user: {
                        username: user.username,
                        password: oldPassword
                    }
                })
                .then(r => {
                    axios
                        .patch(`http://localhost:3000/api/users/${user.id}`, {
                            user: {
                                username: user.username,
                                password: newPassword
                            }
                        })
                        .then(r => {
                            dispatch(updatePasswordSuccess({ general: ["Password Updated"] }))
                        })
                        .catch(error => {
                            if (error.response && error.response.data && error.response.data.errors) {
                                dispatch(updatePasswordFailure(error.response.data.errors))
                            }
                            else {
                                dispatch(updatePasswordFailure({ unknown: [error.message] }))
                            }
                        })
                })
                .catch(e => {
                    dispatch(updatePasswordFailure({ general: ["Your old password was entered incorrectly"] }))
                })
        }
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

export const updateUserFailure = (errors) => {
    return {
        type: ActionTypes.UPDATE_USER_FAILURE,
        payload: errors
    }
}

export const updatePasswordSuccess = (message) => {
    return {
        type: ActionTypes.UPDATE_PASSWORD_SUCCESS,
        payload: message
    }
}

export const updatePasswordFailure = (errors) => {
    return {
        type: ActionTypes.UPDATE_PASSWORD_FAILURE,
        payload: errors
    }
}