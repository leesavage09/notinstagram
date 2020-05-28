import React from 'react';
import OptionsModal, { STYLE_PRIMARY } from './options_modal'
import { useDispatch, useSelector } from 'react-redux'
import * as UISelector from '../../redux/selectors/ui_selector'
import * as UIActions from '../../redux/actions/ui_actions'
import { logout } from '../../redux/actions/session_actions'

export default function ChangeAvatarModal() {
    const dispatch = useDispatch();
    const show = useSelector(UISelector.showLogOutModal())

    const close = () => dispatch(UIActions.hideLogOutModal())

    const handelLogout = () => {
        dispatch(UIActions.hideLogOutModal())
        dispatch(logout())
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