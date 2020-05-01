import { useSelector, useDispatch } from 'react-redux'
import React from 'react';
import { Link } from "react-router-dom";
import * as Actions from '../redux/actions/session_actions'
import NoAuthContainer from '../components/auth_container'

export default function Signup() {
    const dispatch = useDispatch()

    const loading = useSelector(state => state.loading)
    const errorsMessages = useSelector(state => {
        return state.errors.session.auth ? state.errors.session.auth : []
    })

    const usernameInput = React.createRef();
    const passwordInput = React.createRef();

    function loginClicked() {
        dispatch(Actions.loginUser({
            username: usernameInput.current.value,
            password: passwordInput.current.value
        }))
    }

    function loginGuest() {
        alert('guest login')
    }

    const errorListItems = []
    errorsMessages.forEach((message, idx) => {
        errorListItems.push(<li key={idx}>{message}</li>)
    });

    return (
        <NoAuthContainer>

            <button className='cta'
                disabled={loading}
                onClick={loginGuest}
            >Continue as guest</button>

            <div className='spacer-text'>
                <div className='spacer'></div>
                <div className='text' >OR</div>
                <div className='spacer'></div>
            </div>


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

            <button className='cta'
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
