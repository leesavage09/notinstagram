import { useSelector, useDispatch } from 'react-redux'
import React from 'react';
import { sessionActions, sessionSelector } from '../../redux/slice/session_slice'
import { modalActions } from '../../redux/slice/modal_slice'
import { TopNavBackWithTitle } from '../../components/top_nav'
import BottomNav from '../../components/bottom_nav'
import { uiLoadingSelector } from '../../redux/slice/ui_loading_slice'
import UserAvatar, { SMALL_LOADING_SPINNER } from '../../components/user_avatar';

export default function Edit() {
    const dispatch = useDispatch()
    const loading = useSelector(uiLoadingSelector.disable_buttons())
    const user = useSelector(sessionSelector.loggedInUser())
    const nameInput = React.createRef();
    const usernameInput = React.createRef();
    const emailInput = React.createRef();
    const bioInput = React.createRef();

    const updateClicked = () => {
        const newUser = {
            id: user.id,
            username: usernameInput.current.value,
            name: nameInput.current.value,
            email: emailInput.current.value,
            bio: bioInput.current.value
        }
        dispatch(sessionActions.updateUser(newUser))
    }

    return (
        <div>
            <TopNavBackWithTitle title="Edit Profile" />
            <div className='edit-details'>
                <UserAvatar
                    className="edit-details__image"
                    spinnerStyle={SMALL_LOADING_SPINNER}
                    user={user}
                    onClick={() => { dispatch(modalActions.showChangeAvatarModal(true)) }}
                />
                <div>
                    <h2 className='edit-details__username'>{user.username}</h2>
                    <a onClick={() => { dispatch(modalActions.showChangeAvatarModal(true)) }}>
                        Change Profile Photo
                    </a>
                </div>
            </div>
            <div className='edit-form'>
                <label className='edit-form__lable'>Name</label>
                <input
                    className='white-input edit-form__input'
                    ref={nameInput}
                    type="name"
                    defaultValue={user.name}
                    autoComplete="name"
                />
                <label className='edit-form__lable'>Username</label>
                <input
                    className='white-input edit-form__input'
                    ref={usernameInput}
                    type="username"
                    defaultValue={user.username}
                    autoComplete="username"
                />
                <label className='edit-form__lable'>Email</label>
                <input
                    className='white-input edit-form__input'
                    ref={emailInput}
                    type="email"
                    defaultValue={user.email}
                    autoComplete="email"
                />
                <label className='edit-form__lable'>Bio</label>
                <textarea className='white-input edit-form__text-area' ref={bioInput}
                    type="text"
                    defaultValue={user.bio}
                />
                <button
                    className='blue-button edit-form__button'
                    disabled={loading}
                    onClick={updateClicked}
                >Submit</button>
            </div>
            <BottomNav />
        </div>
    );
}
