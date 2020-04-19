import { useSelector, useDispatch } from 'react-redux'
import React from 'react';
import { Link } from "react-router-dom";
import * as Selectors from './login_selectors'
import * as Actions from './login_actions'

export default function Signup() {
    const dispatch = useDispatch()

    const loading = useSelector(state => Selectors.loading(state))
    const errorsMessages = useSelector(state => Selectors.errorsMessages(state))

    const usernameInput = React.createRef();
    const passwordInput = React.createRef();

    function loginClicked() {
        dispatch(Actions.loginUser({
            username: usernameInput.current.value,
            password: passwordInput.current.value
        }))
    }

    const errorListItems = []
    errorsMessages.forEach((message, idx) => {
        errorListItems.push(<li key={idx}>{message}</li>)
    });

    return (
        <div>
            <h1 className="logo" >notinstagram</h1>

            <input ref={usernameInput}
                type="username"
                placeholder='username'
                autoComplete="username"
            />
            <input ref={passwordInput}
                type="password"
                placeholder='password'
                autoComplete="new-password"
            />

            <button
                disabled={loading}
                onClick={loginClicked}
            >Log In</button>

            <ul>
                {errorListItems}
            </ul>

            <div>
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
        </div >
    );
}
