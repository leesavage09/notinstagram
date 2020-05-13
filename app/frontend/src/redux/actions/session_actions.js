import * as Types from './action_types'
import * as UiActions from './ui_actions'
import * as api_util from '../../util/api'

export const loginUser = (user) => {
    return (dispatch) => {
        dispatch(UiActions.createAsyncRequest())

        api_util.loginUser(user.username, user.password)
            .then(r => dispatch(loginSuccess(r.data)))
            .catch(e => {
                dispatch(loginFailure(e))
            })
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch(UiActions.createAsyncRequest())

        api_util.logoutUser()
            .then(r => dispatch(logoutSuccess(r.data)))
            .catch(e => {
                dispatch(logoutFailure(e))
            })
    }
}

export const loginSuccess = (user) => {
    return {
        type: Types.LOGIN_SUCCESS,
        payload: user
    }
}

const loginFailure = (errors) => {
    return {
        type: Types.LOGIN_FAILURE,
        payload: errors
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