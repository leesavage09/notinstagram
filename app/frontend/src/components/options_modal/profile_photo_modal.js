import React from 'react';
import { useHistory } from "react-router-dom";
import OptionsModal, { STYLE_DANGER, STYLE_PRIMARY } from './options_modal'
import { useDispatch, useSelector } from 'react-redux'
import * as UISelector from '../../redux/selectors/ui_selector'
import * as UIActions from '../../redux/actions/ui_actions'
import * as UserActions from '../../redux/actions/user_actions'
import ImageSelectButton from '../image_select_button';

export default function ProfilePhotoModal() {
    const dispatch = useDispatch();
    const show = useSelector(state => UISelector.showProfilePhotoModal(state))
    const history = useHistory();

    const removePhoto = () => {
        dispatch(UserActions.removeProfileImage())
        close()
    }

    const fileSelected = () => {
        history.push("/create-profile-image")
        close()
    }

    const close = () => dispatch(UIActions.hideProfilePhotoModal(false))

    return show ? (
        <OptionsModal
            title='Change Profile Photo'
            onClose={close}
            elements={[
                <ImageSelectButton
                    key="1"
                    className={STYLE_PRIMARY}
                    imageSelected={fileSelected}
                >Upload Photo</ImageSelectButton>,
                <button
                    key="2"
                    className={STYLE_DANGER}
                    onClick={removePhoto}
                >Remove Current Photo</button>
            ]}
        />
    ) : '';
}