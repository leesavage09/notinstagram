import React from 'react';
import ImageEditor from '../components/image_editor'
import { TopNavCreatePhoto } from '../components/top_nav'
import { sessionActions } from '../redux/slice/session_slice'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { imageEditorSelector } from '../redux/slice/image_editor_slice';

export default function CreateUserAvatar() {
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
            <TopNavCreatePhoto title="Profile Photo" button_title="Save" button_action={() => {
                history.goBack()
                dispatch(sessionActions.updateAvatar())
            }} />
            <ImageEditor image={selectedImage} maxRes='320' forceSquareImage={true} />
        </div>
    );
}
