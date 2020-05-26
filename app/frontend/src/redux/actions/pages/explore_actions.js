import * as ApiUtil from '../../../util/api'
import * as ActionTypes from '../action_types'

export const searchForUsers = (searchQuery) => {
    return (dispatch) => {
        dispatch(foundUsersRequest())

        ApiUtil.findUser(searchQuery)
            .then(r => {
                dispatch(foundUsersSuccess(r.data))
            })
            .catch(e => {
                dispatch(foundUsersFailure(e))
            })
    }
}

export const foundUsersRequest = () => {
    return {
        type: ActionTypes.FOUND_USERS_REQUEST
    }
}

export const foundUsersSuccess = (user) => {
    return {
        type: ActionTypes.FOUND_USERS_SUCCESS,
        payload: user
    }
}

export const foundUsersFailure = (error) => {
    return {
        type: ActionTypes.FOUND_USERS_FAILURE,
        payload: error
    }
}