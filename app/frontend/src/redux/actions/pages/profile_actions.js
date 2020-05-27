import * as ApiUtil from '../../../util/api'
import * as ActionTypes from '../action_types'

export const getUser = (id,page) => {
    return (dispatch) => {
        dispatch(getUserRequest())

        ApiUtil.getUser(id,page)
            .then(r => {
                dispatch(getUserSuccess(r.data))
            })
            .catch(e => {
                dispatch(getUserFailure(e))
            })
    }
}

export const getUserRequest = () => {
    return {
        type: ActionTypes.GET_USER_REQUEST
    }
}

export const getUserSuccess = (user) => {
    return {
        type: ActionTypes.GET_USER_SUCCESS,
        payload: user
    }
}

export const getUserFailure = (error) => {
    return {
        type: ActionTypes.GET_USER_FAILURE,
        payload: error
    }
}