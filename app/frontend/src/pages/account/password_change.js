import { useSelector, useDispatch } from 'react-redux'
import React, { useState } from 'react';
import * as UserActions from '../../redux/actions/user_actions'
import * as SessionActions from '../../redux/actions/session_actions'
import * as Selectors from '../../redux/selectors/user_selectors'
import TopNav from '../../components/top_nav/top_nav_back_with_title'
import BottomNav from '../../components/mobile_footer'
import Toast from '../../components/toast_notification';

export default function PasswordChange() {
    const dispatch = useDispatch()

    const loading = useSelector(state => state.loading)
    const user = useSelector(state => Selectors.loggedInUser(state))
    const errorsMessages = useSelector(state => Selectors.errorsMessages(state))

    const oldPassword = React.createRef();
    const newPassword = React.createRef();
    const confirmPassword = React.createRef();

    const [notification, setNotification] = useState('');

    const errorListItems = []
    errorsMessages.forEach((message, idx) => {
        errorListItems.push(
            <li
                className="error-list__item"
                key={idx}>
                {message}
            </li>
        )
    });

    const showToast = (text) => {
        setNotification(<Toast duration='4500' onComplete={() => {
            setNotification('')
        }} message={text} />)
    }

    const changePasswordClicked = () => {
        if (newPassword.current.value !== confirmPassword.current.value) {
            showToast("Make sure both passwords match")
        }
        else {
            const oldUser = {
                username: user.username,
                password: oldPassword.current.value
            }
            const newUser = {
                id: user.id,
                password: newPassword.current.value
            }

            dispatch(SessionActions.loginUser(oldUser))
                .then(() => {
                    changePassword(newUser)
                })
                .catch(() => {
                    showToast("Your old password was entered incorrectly")
                })
        }
    }

    const changePassword = (newUser) => {
        dispatch(UserActions.updateUser(newUser))
            .then((r) => {
                showToast("Your password has been changed")
            })
    }

    return (
        <div>
            <TopNav title="Change Password" />
            <div className='edit-details'>
                <img className="edit-details__image" alt="leesavage09's profile picture" src="https://instagram.fltn2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/94246361_561658168093273_8809993563602419712_n.jpg?_nc_ht=instagram.fltn2-1.fna.fbcdn.net&amp;_nc_ohc=jyjQkwhQAnUAX_LL1eY&amp;oh=708be17a299ed16157d1d4787986aacf&amp;oe=5ED3EA64"></img>
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

            <ul className='error-list' >
                {errorListItems}
            </ul>

            {notification}
            <BottomNav />
        </div>
    );
}
