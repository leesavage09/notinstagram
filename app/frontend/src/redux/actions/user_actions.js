import axios from 'axios'
import * as ActionTypes from './action_types'

export const createUser = (user) => {
    return (dispatch) => {
        dispatch(createUserRequest())
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
        dispatch(updateUserRequest())
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

const createUserRequest = () => {
    return {
        type: ActionTypes.CREATE_USER_REQUEST
    }
}

const createUserSuccess = (user) => {
    return {
        type: ActionTypes.CREATE_USER_SUCCESS,
        user: user
    }
}

const createUserFailure = (errors) => {
    return {
        type: ActionTypes.CREATE_USER_FAILURE,
        error: errors
    }
}

const updateUserRequest = () => {
    return {
        type: ActionTypes.UPDATE_USER_REQUEST
    }
}

const updateUserSuccess = (user) => {
    return {
        type: ActionTypes.UPDATE_USER_SUCCESS,
        user: user
    }
}

export const updateUserFailure = (errors) => {
    return {
        type: ActionTypes.UPDATE_USER_FAILURE,
        error: errors
    }
}