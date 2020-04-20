import axios from 'axios'
import * as Types from '../../redux/actions/action_types'

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

const loginUserSuccess = (user) => {
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