import React from 'react';
import ImageEditor from '../components/image_editor'
import TopNav from '../components/top_nav/top_nav_create_photo'
import * as ImageActions from '../redux/actions/image_actions'
import * as ImageSelector from '../redux/selectors/image_selector'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";

export default function CreateImage() {
    const dispatch = useDispatch()
    const history = useHistory();
    return (
        <div>
            <TopNav title="Profile Photo" button_title="Save" button_action={() => {
                history.goBack()
                dispatch(ImageActions.uploadSavedImage())
            }} />
            <ImageEditor maxRes='320' />
        </div>
    );
}
