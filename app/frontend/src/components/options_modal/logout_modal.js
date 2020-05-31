import React from 'react';
import OptionsModal, { STYLE_PRIMARY } from './options_modal'
import { useDispatch, useSelector } from 'react-redux'
import { modalActions, modalSelector } from '../../redux/slice/modal_slice'
import { sessionActions } from '../../redux/slice/session_slice'

export default function ChangeAvatarModal() {
    const dispatch = useDispatch();
    const show = useSelector(modalSelector.logOutModalVisible())

    const close = () => dispatch(modalActions.showLogOutModal(false))

    const handelLogout = () => {
        dispatch(modalActions.showLogOutModal(false))
        dispatch(sessionActions.logout())
    }

    return show ? (
        <OptionsModal
            title='Log Out?'
            text="Are you sure you want to log out of your account?"
            onClose={close}
            elements={[
                <button
                    key="1"
                    className={STYLE_PRIMARY}
                    onClick={handelLogout}
                >Log out</button>
            ]}
        />
    ) : '';
}