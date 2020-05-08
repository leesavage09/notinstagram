import axios from 'axios'
import * as Types from './action_types'
import * as UiActions from './ui_actions'

export const loginUser = (user) => {
    return (dispatch) => {
        dispatch(UiActions.createAsyncRequest())
        return axios
            .post('http://localhost:3000/api/session/', {
                user: {
                    username: user.username,
                    password: user.password
                }
            }, {
                    withCredentials: true
                }
            )
            .then(response => {
                const user = response.data
                dispatch(loginUserSuccess(user))
                return Promise.resolve("Logged In")
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.errors) {
                    dispatch(loginUserFailure(error.response.data.errors))
                }
                else if (error.message) {
                    dispatch(loginUserFailure({ unknown: [error.message] }))
                }
                return Promise.reject(error)
            })
    }
}

export const loginUserSuccess = (user) => {
    return {
        type: Types.LOGIN_USER_SUCCESS,
        payload: user
    }
}

const loginUserFailure = (errors) => {
    return {
        type: Types.LOGIN_USER_FAILURE,
        payload: errors
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch(UiActions.createAsyncRequest())
        return axios
            .delete('http://localhost:3000/api/session/', {}, {
                withCredentials: true
            })
            .then(response => {
                const user = response.data
                dispatch(logoutSuccess(user))
                return Promise.resolve("Logged In")
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.errors) {
                    dispatch(logoutFailure(error.response.data.errors))
                }
                else if (error.message) {
                    dispatch(logoutFailure({ unknown: [error.message] }))
                }
                return Promise.reject(error)
            })
    }
}

const logoutSuccess = (user) => {
    return {
        type: Types.LOGOUT_SUCCESS,
        payload: user
    }
}

const logoutFailure = (errors) => {
    return {
        type: Types.LOGOUT_FAILURE,
        payload: errors
    }
}