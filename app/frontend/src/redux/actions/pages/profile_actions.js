import * as ApiUtil from '../../../util/api'
import * as UiActions from '../ui_actions'
import * as ActionTypes from '../action_types'

export const getProfile = (id,page) => {
    return (dispatch) => {
        dispatch(UiActions.asyncRequest())

        ApiUtil.getProfile(id,page)
            .then(r => {
                dispatch(getProfileSuccess(r.data))
            })
            .catch(e => {
                dispatch(getProfileFailure(e))
            })
    }
}

export const getProfileSuccess = (profile) => {
    return {
        type: ActionTypes.GET_PROFILE_SUCCESS,
        payload: profile
    }
}

export const getProfileFailure = (error) => {
    return {
        type: ActionTypes.GET_PROFILE_FAILURE,
        payload: error
    }
}