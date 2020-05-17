import * as UiActions from '../ui_actions'

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