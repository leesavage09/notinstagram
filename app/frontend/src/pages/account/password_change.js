import { useSelector, useDispatch } from 'react-redux'
import React from 'react';
import { sessionActions, sessionSelector } from '../../redux/slice/session_slice'
import { uiLoadingSelector } from '../../redux/slice/ui_loading_slice'
import { TopNavBackWithTitle } from '../../components/top_nav'
import BottomNav from '../../components/bottom_nav'
import UserAvatar from '../../components/user_avatar';

export default function PasswordChange() {
    const dispatch = useDispatch()
    const loading = useSelector(uiLoadingSelector.disable_buttons())
    const user = useSelector(sessionSelector.loggedInUser())
    const oldPassword = React.createRef();
    const newPassword = React.createRef();
    const confirmPassword = React.createRef();

    const changePasswordClicked = () => {
        const newUser = {
            id: user.id,
            username: user.username,
            password: newPassword.current.value
        }
        dispatch(sessionActions.updatePassword({
            user: newUser,
            oldPassword: oldPassword.current.value,
            newPassword: newPassword.current.value,
            newPasswordConfirmation: confirmPassword.current.value
        }))
    }

    return (
        <div>
            <TopNavBackWithTitle title="Change Password" />
            <div className='edit-details'>
                <UserAvatar className="edit-details__image" user={user} />
                <div>
                    <h1 className='edit-details__h1-username'>{user.username}</h1>
                </div>
            </div>
            <div className='edit-form'>
                <label className='edit-form__lable'>Old Password</label>
                <input
                    className='grey-input edit-form__input'
                    ref={oldPassword}
                    type="password"
                    autoComplete="password"
                />
                <label className='edit-form__lable'>New Password</label>
                <input
                    className='grey-input edit-form__input'
                    ref={newPassword}
                    type="password"
                    autoComplete="new-password"
                />
                <label className='edit-form__lable'>Confirm New Password</label>
                <input
                    className='grey-input edit-form__input'
                    ref={confirmPassword}
                    type="password"
                />
                <button
                    className='colour-button edit-form__button'
                    disabled={loading}
                    onClick={changePasswordClicked}
                >Change Password</button>
            </div>
            <BottomNav />
        </div>
    );
}