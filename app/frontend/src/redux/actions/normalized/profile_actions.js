import * as ActionTypes from '../action_types'
import * as UiActions from '../ui_actions'
import { Utilitys as ImageUtil } from '../../../util/image'
import * as AmazonS3 from '../../../util/amazon_s3'
import * as ImageSelector from '../../selectors/component/image_selector'
import * as SessionSelector from '../../selectors/session_selector'
import * as SessionActions from '../session_actions'
import * as ApiUtil from '../../../util/api'

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