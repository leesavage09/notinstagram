import React from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import * as ImageActions from '../../redux/actions/image_actions'
import OptionsModal, { STYLE_DANGER, STYLE_PRIMARY } from './options_modal'
import { Utilitys } from '../../util/image'

export default function ProfilePhotoModal(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const fileInput = React.createRef();

    const uploadPhoto = () => {
        fileInput.current.click();
    }

    const removePhoto = () => {
        console.log("remove photo TODO!")
    }

    const fileSelected = () => {
        Utilitys.fetchImageFromFile(fileInput.current.files[0])
            .then((img) => {
                dispatch(ImageActions.imageSelectSuccess(img))
                history.push("/create-profile-image")
            })
            .catch((error) => {
                dispatch(ImageActions.imageSelectFailure(error))
                props.onClose()
            })
    }

    return (
        <OptionsModal
            title='Change Profile Photo'
            onClose={props.onClose}
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
    );
}