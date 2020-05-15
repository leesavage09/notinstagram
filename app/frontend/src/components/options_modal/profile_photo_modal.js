import React from 'react';
import { useHistory } from "react-router-dom";
import { imageSelectSuccess, imageSelectFailure } from '../../redux/actions/image_actions'
import OptionsModal, { STYLE_DANGER, STYLE_PRIMARY } from './options_modal'
import { Utilitys } from '../../util/image'
import { useDispatch, useSelector } from 'react-redux'
import * as UISelector from '../../redux/selectors/ui_selector'
import * as UIActions from '../../redux/actions/ui_actions'
import * as UserActions from '../../redux/actions/user_actions'

export default function ProfilePhotoModal() {
    const dispatch = useDispatch();
    const show = useSelector(state => UISelector.showProfilePhotoModal(state))
    const history = useHistory();
    const fileInput = React.createRef();

    const uploadPhoto = () => fileInput.current.click();

    const removePhoto = () => {
        dispatch(UserActions.removeProfileImage())
        close()
    }

    const fileSelected = () => {
        Utilitys.fetchImageFromFile(fileInput.current.files[0])
            .then(img => {
                dispatch(imageSelectSuccess(img))
                history.push("/create-profile-image")
                close()
            })
            .catch(e => dispatch(imageSelectFailure(e)))
    }

    const close = () => dispatch(UIActions.hideProfilePhotoModal(false))


    return show ? (
        <OptionsModal
            title='Change Profile Photo'
            onClose={close}
            options={[
                {
                    text: 'Upload Photo',
                    action: uploadPhoto,
                    style: STYLE_PRIMARY
                },
                {
                    text: 'Remove Current Photo',
                    action: removePhoto,
                    style: STYLE_DANGER
                }
            ]}
        >
            <input
                ref={fileInput}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={fileSelected}
            />
        </OptionsModal>
    ) : '';
}