import { useSelector, useDispatch } from 'react-redux'
import React from 'react';
import { Link, Redirect } from "react-router-dom";
import * as Actions from '../redux/actions/user_actions'
import * as Selectors from '../redux/selectors/user_selectors'


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

    const errorListItems = []
    errorsMessages.forEach((message, idx) => {
        errorListItems.push(<li key={idx}>{message}</li>)
    });

    return (
        <div>
            <h1 className="logo" >notinstagram</h1>
            <h2>Sign up to see photos and videos from your friends.</h2>

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

            <button disabled={loading} onClick={signUpClicked}>Sign-up</button>

            <ul>
                {errorListItems}
            </ul>

            <div>
                <p>Have an account? <Link to="/login">Log in</Link></p>
            </div>
        </div >
    );
}
