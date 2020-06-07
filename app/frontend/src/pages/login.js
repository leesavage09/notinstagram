import { useSelector, useDispatch } from 'react-redux'
import React from 'react';
import { Link } from "react-router-dom";
import NoAuthContainer from '../components/auth_container'
import { uiLoadingSelector } from '../redux/slice/ui_loading_slice'
import { toastSelector } from '../redux/slice/toast_slice'
import { sessionActions } from '../redux/slice/session_slice'

export default function Signup() {
    const dispatch = useDispatch()

    const loading = useSelector(uiLoadingSelector.disable_buttons())
    const errorsMessages = useSelector(toastSelector.allErrors())

    const usernameInput = React.createRef();
    const passwordInput = React.createRef();

    function loginClicked() {
        dispatch(sessionActions.login({
            username: usernameInput.current.value,
            password: passwordInput.current.value
        }))
    }

    function loginGuest() {
        dispatch(sessionActions.login({
            username: 'guest',
            password: 'guestaccount'
        }))
    }

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

    return (
        <NoAuthContainer>

            <button className='blue-button'
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
                autoComplete="password"
            />

            <button className='blue-button'
                disabled={loading}
                onClick={loginClicked}
            >Log In</button>

            <ul className='error-list' >
                {errorListItems}
            </ul>

            <div>
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
        </NoAuthContainer >
    );
}
