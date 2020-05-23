import React from 'react';
import TopNav from '../components/top_nav/top_nav_create_post'
import * as ImageActions from '../redux/actions/component/image_actions'
import * as ImageSelector from '../redux/selectors/component/image_selector'
import UserAvatar from '../components/user_avatar';
import * as PostActions from '../redux/actions/normalized/post_actions'

import { useSelector, useDispatch } from 'react-redux'
import { loggedInUser } from '../redux/selectors/session_selector'

export default function CreatePost() {
    const dispatch = useDispatch()
    const user = useSelector(loggedInUser)
    const selectedImage = useSelector(ImageSelector.processedImage())
    const outerContainer = React.createRef()
    const textArea = React.createRef()
    const imageSrc = selectedImage ? selectedImage.toDataURL() : ''

    React.useEffect(() => {
        if (!selectedImage) { //TODO remove after testing //for dev only
            const myImage = new Image(200, 200);
            myImage.src = `/filters/Normal.jpg`;
            myImage.onload = () => {
                dispatch(ImageActions.imageSelectSuccess(myImage))
            }
        }
    })

    const createPost = () => {
        dispatch(PostActions.createPost({
            body: textArea.current.value
        }))
    }

    return (
        <div ref={outerContainer} className="create-post">
            <TopNav createPost={createPost} />
            <div className="create-post__container">
                <UserAvatar
                    className="create-post__user-avatar"
                    user={user}
                />
                <textarea
                    ref={textArea}
                    className="create-post__textarea"
                    aria-label="Write a caption…"
                    placeholder="Write a caption…"
                    autoComplete="off"
                    autoCorrect="off"
                    onFocus={() => outerContainer.current.className = "create-post create-post--typing"}
                    onBlur={() => outerContainer.current.className = "create-post"}
                />
                <img
                    className="create-post__post-image"
                    src={imageSrc} />
            </div>
        </div >
    );
}
