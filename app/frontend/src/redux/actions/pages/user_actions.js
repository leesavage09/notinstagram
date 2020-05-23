import * as ApiUtil from '../../../util/api'
import * as UiActions from '../ui_actions'
import * as ActionTypes from '../action_types'

export const getUser = (id,page) => {
    return (dispatch) => {
        dispatch(UiActions.asyncRequest())

        ApiUtil.getUser(id,page)
            .then(r => {
                dispatch(getUserSuccess(r.data))
            })
            .catch(e => {
                dispatch(getUserFailure(e))
            })
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