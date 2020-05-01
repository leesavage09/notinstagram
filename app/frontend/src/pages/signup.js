import { useSelector, useDispatch } from 'react-redux'
import React from 'react';
import { Link, Redirect } from "react-router-dom";
import * as Actions from '../redux/actions/user_actions'
import * as Selectors from '../redux/selectors/user_selectors'
import NoAuthContainer from '../components/auth_container'


export default function Signup() {
    const loggedInUser = useSelector(state => Selectors.loggedInUser)
    if (loggedInUser) {
        <Redirect to="/" /> 
    }

    const loading = useSelector(state => state.loading)
    const errorsMessages = useSelector(state => Selectors.errorsMessages(state))
    const errorTypes = useSelector(state => Selectors.errorTypes(state))
    const dispatch = useDispatch()

    const usernameInput = React.createRef();
    const passwordInput = React.createRef();
    const nameInput = React.createRef();
    const emailInput = React.createRef();

    function signUpClicked() {
        dispatch(Actions.createUser({
            username: usernameInput.current.value,
            password: passwordInput.current.value,
            name: nameInput.current.value,
            email: emailInput.current.value
        }))
    }

    function loginGuest() {
        alert("login guest")
    }

    const errorListItems = []
    errorsMessages.forEach((message, idx) => {
        errorListItems.push(<li key={idx}>{message}</li>)
    });

    return (
        <NoAuthContainer>
            <h2>Sign up to see photos and videos from your friends.</h2>

            <button className='cta'
                disabled={loading}
                onClick={loginGuest}
            >Continue as guest</button>

            <div className='spacer-text'>
                <div className='spacer'></div>
                <div className='text' >OR</div>
                <div className='spacer'></div>
            </div>

            <input ref={emailInput}
                type="email"
                className={errorTypes.includes("email") ? "error" : ""}
                placeholder='email'
                autoComplete="email" 
            />
            <input ref={nameInput}
                type="text"
                className={errorTypes.includes("name") ? "error" : ""}
                placeholder='name'
                autoComplete="name"
            />
            <input ref={usernameInput}
                type="username"
                className={errorTypes.includes("username") ? "error" : ""}
                placeholder='username'
                autoComplete="username"
            />
            <input ref={passwordInput}
                type="password"
                className={errorTypes.includes("password") ? "error" : ""}
                placeholder='password'
                autoComplete="new-password"
            />

            <button className='cta' disabled={loading} onClick={signUpClicked}>Sign-up</button>

            <ul className='error-list' >
                {errorListItems}
            </ul>

            <div>
                <p>Have an account? <Link to="/login">Log in</Link></p>
            </div>
        </NoAuthContainer>
    );
}
