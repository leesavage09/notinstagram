import React from 'react';
import ImageEditor from '../components/image_editor'
import TopNav from '../components/top_nav/top_nav_create_photo'
import * as UserActions from '../redux/actions/user_actions'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";

export default function CreateProfileImage() {
    const dispatch = useDispatch()
    const history = useHistory();
    return (
        <div>
            <TopNav title="Profile Photo" button_title="Save" button_action={() => {
                history.goBack()
                dispatch(UserActions.updateProfileImage())
            }} />
            <ImageEditor maxRes='320' />
        </div>
    );
}
