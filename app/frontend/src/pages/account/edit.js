import { useSelector, useDispatch } from 'react-redux'
import React from 'react';
import * as SessionActions from '../../redux/actions/session_actions'
import * as SessionSelector from '../../redux/selectors/session_selector'
import * as UISelector from '../../redux/selectors/ui_selector'
import { showChangeAvatarModal } from '../../redux/actions/ui_actions'
import TopNav from '../../components/top_nav/top_nav_back_with_title'
import BottomNav from '../../components/bottom_nav'
import UserAvatar, { SMALL_LOADING_SPINNER } from '../../components/user_avatar';

export default function Edit() {
    const dispatch = useDispatch()
    const loading = useSelector(UISelector.isButton_loading())
    const user = useSelector(SessionSelector.loggedInUser())
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
        dispatch(SessionActions.updateUser(newUser))
    }

    return (
        <div>
            <TopNav title="Edit Profile" />
            <div className='edit-details'>
                <UserAvatar
                    className="edit-details__image"
                    spinnerStyle={SMALL_LOADING_SPINNER}
                    user={user}
                    onClick={() => { dispatch(showChangeAvatarModal(true)) }}
                />
                <div>
                    <h2 className='edit-details__username'>{user.username}</h2>
                    <a onClick={() => { dispatch(showChangeAvatarModal(true)) }}>
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
                    className='colour-button edit-form__button'
                    disabled={loading}
                    onClick={updateClicked}
                >Submit</button>
            </div>
            <BottomNav />
        </div>
    );
}
