import React from 'react';
import ImageEditor from '../components/image_editor'
import {TopNavCreatePhoto} from '../components/top_nav'
import * as SessionActions from '../redux/actions/session_actions'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";

export default function CreateUserAvatar() {
    const dispatch = useDispatch()
    const history = useHistory();
    return (
        <div>
            <TopNavCreatePhoto title="Profile Photo" button_title="Save" button_action={() => {
                history.goBack()
                dispatch(SessionActions.updateUserAvatar())
            }} />
            <ImageEditor maxRes='320' forceSquareImage={true} />
        </div>
    );
}
