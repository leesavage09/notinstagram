import axios from 'axios'
import * as Types from './action_types'

export const loginUser = (user) => {
    return (dispatch) => {
        dispatch(loginUserRequest())
        axios
            .post('http://localhost:3000/api/session/', {
                user: {
                    username: user.username,
                    password: user.password
                }
            },{
                withCredentials: true
            }
            )
            .then(response => {
                const user = response.data
                dispatch(loginUserSuccess(user))
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.errors) {
                    dispatch(loginUserFailure(error.response.data.errors))
                }
                else if (error.message) {
                    dispatch(loginUserFailure({unknown: [error.message]}))
                }
            })
    }
}

const loginUserRequest = () => {
    return {
        type: Types.LOGIN_USER_REQUEST
    }
}

export const loginUserSuccess = (user) => {
    return {
        type: Types.LOGIN_USER_SUCCESS,
        user: user
    }
}

const loginUserFailure = (errors) => {
    return {
        type: Types.LOGIN_USER_FAILURE,
        error: errors
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch(logoutRequest())
        axios
            .delete('http://localhost:3000/api/session/', {},{
                withCredentials: true
            })
            .then(response => {
                const user = response.data
                dispatch(logoutSuccess(user))
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.errors) {
                    dispatch(logoutFailure(error.response.data.errors))
                }
                else if (error.message) {
                    dispatch(logoutFailure({unknown: [error.message]}))
                }
            })
    }
}

const logoutRequest = () => {
    return {
        type: Types.LOGOUT_REQUEST
    }
}

const logoutSuccess = (user) => {
    return {
        type: Types.LOGOUT_SUCCESS,
        user: user
    }
}

const logoutFailure = (errors) => {
    return {
        type: Types.LOGOUT_FAILURE,
        error: errors
    }
}