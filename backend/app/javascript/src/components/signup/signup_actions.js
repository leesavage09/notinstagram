import axios from 'axios'

export const CREATE_USER_REQUEST = "CREATE_USER_REQUEST";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";

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
                const user = response.data
                dispatch(createUserSuccess(user))
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.errors) {
                    dispatch(createUserFailure(error.response.data.errors))
                }
                else {
                    dispatch(createUserFailure({unknown: [error.message]}))
                }
            })
    }
}

const createUserRequest = () => {
    return {
        type: CREATE_USER_REQUEST
    }
}

const createUserSuccess = (user) => {
    return {
        type: CREATE_USER_SUCCESS,
        user: user
    }
}

const createUserFailure = (errors) => {
    return {
        type: CREATE_USER_FAILURE,
        error: errors
    }
}