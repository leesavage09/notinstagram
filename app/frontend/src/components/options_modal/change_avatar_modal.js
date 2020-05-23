import React from 'react';
import { useHistory } from "react-router-dom";
import OptionsModal, { STYLE_DANGER, STYLE_PRIMARY } from './options_modal'
import { useDispatch, useSelector } from 'react-redux'
import * as UISelector from '../../redux/selectors/ui_selector'
import * as UIActions from '../../redux/actions/ui_actions'
import * as SesionActions from '../../redux/actions/session_actions'
import ImageSelectButton from '../image_select_button';

export default function ChangeAvatarModal() {
    const dispatch = useDispatch();
    const show = useSelector(UISelector.showChangeAvatarModal())
    const history = useHistory();

    const removePhoto = () => {
        dispatch(SesionActions.removeUserAvatar())
        close()
    }

    const fileSelected = () => {
        history.push("/create-user-avatar")
        close()
    }

    const close = () => dispatch(UIActions.hideChangeAvatarModal(false))

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