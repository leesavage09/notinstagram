import { useSelector, useDispatch } from 'react-redux'
import React from 'react';
import { Link } from "react-router-dom";
import * as Actions from '../redux/actions/session_actions'
import NoAuthContainer from '../components/auth_container'
import * as UISelector from '../redux/selectors/ui_selector'

export default function Signup() {
    const dispatch = useDispatch()

    const loading = useSelector(UISelector.isAwaitingAsync())
    const errorsMessages = useSelector(UISelector.allErrors())

    const usernameInput = React.createRef();
    const passwordInput = React.createRef();

    function loginClicked() {
        dispatch(Actions.loginUser({
            username: usernameInput.current.value,
            password: passwordInput.current.value
        }))
    }

    function loginGuest() {
        dispatch(Actions.loginUser({
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

            <button className='colour-button'
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

            <button className='colour-button'
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
