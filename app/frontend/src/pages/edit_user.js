import { useSelector, useDispatch } from 'react-redux'
import React, { useState } from 'react';
import * as Actions from '../redux/actions/user_actions'
import * as Selectors from '../redux/selectors/user_selectors'
import ImageEditor from '../components/image_editor'
import TopNav from '../components/top_nav/top_nav_account_edit'
import BottomNav from '../components/mobile_footer'
import Toast from '../components/toast_notification';

export default function Signup(props) {
    const dispatch = useDispatch()

    const loading = useSelector(state => state.loading)
    const user = useSelector(state => Selectors.loggedInUser(state))
    const errorsMessages = useSelector(state => Selectors.errorsMessages(state))

    const nameInput = React.createRef();
    const usernameInput = React.createRef();
    const emailInput = React.createRef();
    const bioInput = React.createRef();

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

    const updateClicked = () => {
        const newUser = Object.assign(user, {
            username: usernameInput.current.value,
            name: nameInput.current.value,
            email: emailInput.current.value,
            bio: bioInput.current.value
        })
        const callback = () => {
            setNotification(<Toast duration='4500' onComplete={() => {
                setNotification('')
            }} message="Profile Saved" />)
        };
        
        dispatch(Actions.updateUser(newUser, callback))
    }

    return (
        <div>
            <TopNav />
            <div className='edit-details'>
                <img className="edit-details__image" alt="leesavage09's profile picture" src="https://instagram.fltn2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/94246361_561658168093273_8809993563602419712_n.jpg?_nc_ht=instagram.fltn2-1.fna.fbcdn.net&amp;_nc_ohc=jyjQkwhQAnUAX_LL1eY&amp;oh=708be17a299ed16157d1d4787986aacf&amp;oe=5ED3EA64"></img>
                <div>
                    <h2 className='edit-details__username'>{user.username}</h2>
                    <a >Change Profile Photo</a>
                </div>
            </div>
            <div className='edit-form'>
                <label className='edit-form__lable'>Name</label>
                <input className='white-input edit-form__input' ref={nameInput}
                    type="name"
                    defaultValue={user.name}
                    autoComplete="name"
                />
                <label className='edit-form__lable'>Username</label>
                <input className='white-input edit-form__input' ref={usernameInput}
                    type="username"
                    defaultValue={user.username}
                    autoComplete="username"
                />
                <label className='edit-form__lable'>Email</label>
                <input className='white-input edit-form__input' ref={emailInput}
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

            <ul className='error-list' >
                {errorListItems}
            </ul>

            {notification}
            <BottomNav />
        </div>
    );
}
