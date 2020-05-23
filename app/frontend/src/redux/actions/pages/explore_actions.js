import * as ApiUtil from '../../../util/api'
import * as UiActions from '../ui_actions'
import * as ActionTypes from '../action_types'

export const searchForProfiles = (searchQuery) => {
    return (dispatch) => {
        dispatch(UiActions.asyncRequest())

        ApiUtil.findProfile(searchQuery)
            .then(r => {
                dispatch(foundProfilesSuccess(r.data))
            })
            .catch(e => {
                dispatch(foundProfilesFailure(e))
            })
    }
}

export const foundProfilesSuccess = (profile) => {
    return {
        type: ActionTypes.FOUND_PROFILES_SUCCESS,
        payload: profile
    }
}

export const foundProfilesFailure = (error) => {
    return {
        type: ActionTypes.FOUND_PROFILES_FAILURE,
        payload: error
    }
}