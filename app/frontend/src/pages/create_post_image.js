import { useHistory } from "react-router-dom";
import React from 'react';
import ImageEditor from '../components/image_editor'
import { TopNavCreatePhoto } from '../components/top_nav'
import { PostActions } from "../redux/slice/post_slice";
import { useDispatch, useSelector } from 'react-redux'
import { imageEditorSelector } from "../redux/slice/image_editor_slice";

export default function CreateImage() {
    const dispatch = useDispatch()
    const history = useHistory();
    const selectedImage = useSelector(imageEditorSelector.selectedImage())

    React.useEffect(() => {
        if (!selectedImage) {
            history.push("/")
        }
    })

    return (
        <div>
            <TopNavCreatePhoto title="New Photo Post" button_title="Next" button_action={() => {
                dispatch(PostActions.startNewPost())
                history.push("/create-post")
            }} />
            <ImageEditor image={selectedImage} maxRes='1080' />
        </div>
    );
}