import axios from 'axios'

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const loginUser = (user) => {
    return (dispatch) => {
        dispatch(loginUserRequest())
        axios
            .post('http://localhost:3000/api/session/', {
                user: {
                    username: user.username,
                    password: user.password
                }
            })
            .then(response => {
                const user = response.data
                dispatch(loginUserSuccess(user))
            })
            .catch(error => {
                console.log("catch error", error.response.data)
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
        type: LOGIN_USER_REQUEST
    }
}

const loginUserSuccess = (user) => {
    return {
        type: LOGIN_USER_SUCCESS,
        user: user
    }
}

const loginUserFailure = (errors) => {
    console.log("loginUserFailure", errors)
    return {
        type: LOGIN_USER_FAILURE,
        error: errors
    }
}