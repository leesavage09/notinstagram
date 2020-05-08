import { useSelector, useDispatch } from 'react-redux'
import React, { useState } from 'react';
import * as UserActions from '../../redux/actions/user_actions'
import * as UiActions from '../../redux/actions/ui_actions'
import * as SessionSelector from '../../redux/selectors/session_selector'
import * as UISelector from '../../redux/selectors/ui_selector'
import ImageEditor from '../../components/image_editor'
import TopNav from '../../components/top_nav/top_nav_back_with_title'
import BottomNav from '../../components/mobile_footer'
import Toast from '../../components/toast_notification';
import OptionsModal, { STYLE_DANGER, STYLE_PRIMARY } from '../../components/options_modal'

export default function Edit() {
    const dispatch = useDispatch()

    const loading = useSelector(state => UISelector.isAwaitingAsync(state))
    const user = useSelector(state => SessionSelector.loggedInUser(state))
    const messages = useSelector(state => UISelector.allMessages(state))

    const nameInput = React.createRef();
    const usernameInput = React.createRef();
    const emailInput = React.createRef();
    const bioInput = React.createRef();

    const [notification, setNotification] = useState('');
    let toast;

    if (messages.length > 0) {
        toast = <Toast duration='4500' message={messages[0]} />
    }

    const updateClicked = () => {
        const newUser = {
            id: user.id,
            username: usernameInput.current.value,
            name: nameInput.current.value,
            email: emailInput.current.value,
            bio: bioInput.current.value
        }

        dispatch(UserActions.updateUser(newUser))
    }

    const showPhotoOptions = () => {
        dispatch(UiActions.clearMessages())
        setNotification(
            <OptionsModal
                title='Change Profile Photo'
                onClose={() => {
                    setNotification('')
                }}
                options={[
                    {
                        text: 'Upload Photo',
                        action: () => { console.log("upload photo!") },
                        style: STYLE_PRIMARY
                    },
                    {
                        text: 'Remove Current Photo',
                        action: () => { console.log("remove photo!") },
                        style: STYLE_DANGER
                    }
                ]}
            />
        )
    }

    
    return (
        <div>
            <TopNav title="Edit Profile" />
            <div className='edit-details'>
                <img className="edit-details__image" alt="leesavage09's profile picture" src="https://instagram.fltn2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/94246361_561658168093273_8809993563602419712_n.jpg?_nc_ht=instagram.fltn2-1.fna.fbcdn.net&amp;_nc_ohc=jyjQkwhQAnUAX_LL1eY&amp;oh=708be17a299ed16157d1d4787986aacf&amp;oe=5ED3EA64"></img>
                <div>
                    <h2 className='edit-details__username'>{user.username}</h2>
                    <a onClick={showPhotoOptions}>Change Profile Photo</a>
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

            {notification}
            {toast}
            <BottomNav />
        </div>
    );
}
