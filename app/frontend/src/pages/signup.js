import { useSelector, useDispatch } from 'react-redux'
import React from 'react';
import { Link, Redirect } from "react-router-dom";
import { sessionActions, sessionSelector } from '../redux/slice/session_slice'
import { toastSelector } from '../redux/slice/toast_slice'
import { uiLoadingSelector } from '../redux/slice/ui_loading_slice'
import NoAuthContainer from '../components/auth_container'

export default function Signup() {
    const loggedInUser = useSelector(sessionSelector.loggedInUser)
    if (loggedInUser) {
        <Redirect to="/" />
    }

    const loading = useSelector(uiLoadingSelector.disable_buttons())
    const errorMessages = useSelector(toastSelector.allErrors())
    const dispatch = useDispatch()

    const usernameInput = React.createRef();
    const passwordInput = React.createRef();
    const nameInput = React.createRef();
    const emailInput = React.createRef();

    function signUpClicked() {
        dispatch(sessionActions.createUser({
            username: usernameInput.current.value,
            password: passwordInput.current.value,
            name: nameInput.current.value,
            email: emailInput.current.value
        }))
    }

    function loginGuest() {
        dispatch(sessionActions.login({
            username: 'guest',
            password: 'guestaccount'
        }))
    }

    const errorListItems = []
    errorMessages.forEach((message, idx) => {
        errorListItems.push(
            <li
                className='error-list__item'
                key={idx}>
                {message}
            </li>
        )
    });

    return (
        <NoAuthContainer>
            <h2>Sign up to see photos and videos from your friends.</h2>

            <button
                className='blue-button'
                disabled={loading}
                onClick={loginGuest}
            >Continue as guest</button>

            <div className='spacer-text'>
                <div className='spacer-text__spacer'></div>
                <div className='spacer-text__text' >OR</div>
                <div className='spacer-text__spacer'></div>
            </div>

            <input
                className='grey-input'
                ref={emailInput}
                type="email"
                placeholder='email'
                autoComplete="email"
            />
            <input
                className='grey-input'
                ref={nameInput}
                type="text"
                placeholder='name'
                autoComplete="name"
            />
            <input
                className='grey-input'
                ref={usernameInput}
                type="username"
                placeholder='username'
                autoComplete="username"
            />
            <input
                className='grey-input'
                ref={passwordInput}
                type="password"
                placeholder='password'
                autoComplete="new-password"
            />

            <button
                className='blue-button'
                style={{ marginTop: "6px" }}
                disabled={loading}
                onClick={signUpClicked}>Sign-up</button>

            <ul className='error-list' >
                {errorListItems}
            </ul>

            <div>
                <p>Have an account? <Link to="/login">Log in</Link></p>
            </div>
        </NoAuthContainer>
    );
}
