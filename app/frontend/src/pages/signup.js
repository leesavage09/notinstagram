import { useSelector, useDispatch } from 'react-redux'
import React from 'react';
import { Link, Redirect } from "react-router-dom";
import * as SessionActions from '../redux/actions/session_actions'
import * as SessionSelector from '../redux/selectors/session_selector'
import * as UISelector from '../redux/selectors/ui_selector'
import NoAuthContainer from '../components/auth_container'


export default function Signup() {
    const loggedInUser = useSelector(SessionSelector.loggedInUser)
    if (loggedInUser) {
        <Redirect to="/" />
    }

    const loading = useSelector(UISelector.isButton_loading())
    const errorMessages = useSelector(UISelector.allErrors())
    const dispatch = useDispatch()

    const usernameInput = React.createRef();
    const passwordInput = React.createRef();
    const nameInput = React.createRef();
    const emailInput = React.createRef();

    function signUpClicked() {
        dispatch(SessionActions.createUser({
            username: usernameInput.current.value,
            password: passwordInput.current.value,
            name: nameInput.current.value,
            email: emailInput.current.value
        }))
    }

    function loginGuest() {
        dispatch(SessionActions.loginUser({
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
                className='colour-button'
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
                className='colour-button'
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
