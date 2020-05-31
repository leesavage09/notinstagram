import React from 'react';
import { useHistory } from "react-router-dom";
import OptionsModal, { STYLE_DANGER, STYLE_PRIMARY } from './options_modal'
import { useDispatch, useSelector } from 'react-redux'
import { modalActions, modalSelector } from '../../redux/slice/modal_slice'
import { sessionActions } from '../../redux/slice/session_slice'
import ImageSelectButton from '../image_select_button';

export default function ChangeAvatarModal() {
    const dispatch = useDispatch();
    const show = useSelector(modalSelector.changeAvatarModalVisible())
    const history = useHistory();

    const removePhoto = () => {
        dispatch(sessionActions.removeAvatar())
        close()
    }

    const fileSelected = () => {
        history.push("/create-user-avatar")
        close()
    }

    const close = () => dispatch(modalActions.showChangeAvatarModal(false))

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