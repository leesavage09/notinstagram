import * as ActionTypes from './action_types'
import * as UiActions from './ui_actions'
import { Utilitys as ImageUtil } from '../../util/image'
import * as AmazonS3 from '../../util/amazon_s3'
import * as ImageSelector from '../selectors/image_selector'
import * as SessionSelector from '../selectors/session_selector'
import * as SessionActions from './session_actions'
import * as ApiUtil from '../../util/api'

export const createPost = (post) => {
    return (dispatch) => {
        dispatch(UiActions.asyncRequest())

        console.log("create post... TODO...",post)
        // GET S3 Presigned URL
        // Upload To S3
        // create post
        //errors Post did not upload
    }
}