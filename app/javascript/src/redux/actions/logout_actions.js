import axios from 'axios'
import * as Types from '../../redux/actions/action_types'

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