import React from 'react';
import ImageEditor from '../components/image_editor'
import { TopNavCreatePhoto } from '../components/top_nav'
import { sessionActions } from '../redux/slice/session_slice'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";

export default function CreateUserAvatar() {
    const dispatch = useDispatch()
    const history = useHistory();
    return (
        <div>
            <TopNavCreatePhoto title="Profile Photo" button_title="Save" button_action={() => {
                history.goBack()
                dispatch(sessionActions.updateAvatar())
            }} />
            <ImageEditor maxRes='320' forceSquareImage={true} />
        </div>
    );
}
