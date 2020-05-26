import { useSelector, useDispatch } from 'react-redux'
import React from 'react';
import * as SessionActions from '../../redux/actions/session_actions'
import * as SessionSelector from '../../redux/selectors/session_selector'
import * as UISelector from '../../redux/selectors/ui_selector'
import TopNav from '../../components/top_nav/top_nav_back_with_title'
import BottomNav from '../../components/bottom_nav'
import UserAvatar from '../../components/user_avatar';

export default function PasswordChange() {
    const dispatch = useDispatch()
    const loading = useSelector(UISelector.isButton_loading())
    const user = useSelector(SessionSelector.loggedInUser())
    const oldPassword = React.createRef();
    const newPassword = React.createRef();
    const confirmPassword = React.createRef();

    const changePasswordClicked = () => {
        const newUser = {
            id: user.id,
            username: user.username,
            password: newPassword.current.value
        }
        dispatch(SessionActions.updatePassword(
            newUser,
            oldPassword.current.value,
            newPassword.current.value,
            confirmPassword.current.value))
    }

    return (
        <div>
            <TopNav title="Change Password" />
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