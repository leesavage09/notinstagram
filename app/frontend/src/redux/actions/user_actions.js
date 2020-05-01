import axios from 'axios'
import * as ActionTypes from './action_types'

export const createUser = (user) => {
    return (dispatch) => {
        dispatch(createUserRequest())
        axios
            .post('http://localhost:3000/api/users/', {
                user: {
                    username: user.username,
                    password: user.password,
                    email: user.email,
                    name: user.name
                }
            })
            .then(response => {
                dispatch(createUserSuccess(response.data))
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.errors) {
                    dispatch(createUserFailure(error.response.data.errors))
                }
                else {
                    dispatch(createUserFailure({ unknown: [error.message] }))
                }
            })
    }
}


export const updateUser = (user) => {
    console.log("update User", user)
    return (dispatch) => {
        dispatch(updateUserRequest())
        axios
            .patch(`http://localhost:3000/api/users/${user.id}`, {
                user: {
                    username: user.username,
                    bio: user.bio,
                    email: user.email,
                    name: user.name
                }
            })
            .then(response => {
                dispatch(updateUserSuccess(response.data))
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.errors) {
                    dispatch(updateUserFailure(error.response.data.errors))
                }
                else {
                    dispatch(updateUserFailure({ unknown: [error.message] }))
                }
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

const updateUserFailure = (errors) => {
    return {
        type: ActionTypes.UPDATE_USER_FAILURE,
        error: errors
    }
}