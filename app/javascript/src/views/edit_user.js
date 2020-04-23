import { useSelector, useDispatch } from 'react-redux'
import React from 'react';
import { Link } from "react-router-dom";
import * as Actions from '../redux/actions/user_actions'
import * as Selectors from '../redux/selectors/user_selectors'

export default function Signup() {
    const dispatch = useDispatch()

    const loading = useSelector(state => state.loading)
    const user = useSelector(state => Selectors.loggedInUser(state))
    const errorsMessages = useSelector(state => Selectors.updateErrorsMessages(state))
    const errorTypes = useSelector(state => Selectors.updateErrorTypes(state))

    const nameInput = React.createRef();
    const usernameInput = React.createRef();
    const emailInput = React.createRef();
    const bioInput = React.createRef();

    function updateClicked() {
        console.log("updateClicked",user)
        const newUser = Object.assign(user, {
            username: usernameInput.current.value,
            name: nameInput.current.value,
            email: emailInput.current.value,
            bio: bioInput.current.value
        })
        console.log("updateClicked",newUser)
        dispatch(Actions.updateUser(newUser))
    }

    const errorListItems = []
    errorsMessages.forEach((message, idx) => {
        errorListItems.push(<li key={idx}>{message}</li>)
    });

    return (
        <div>
            <h1>Edit User!</h1>
            <div>
                <Link to="/update">Change Profile Photo</Link>
            </div>
            <div>
                <label>Name</label>
                <input ref={nameInput}
                    type="name"
                    className={errorTypes.includes("name") ? "error" : ""}
                    defaultValue={user.name}
                    autoComplete="name"
                /></div>

            <div>
                <label>Username</label>
                <input ref={usernameInput}
                    type="username"
                    className={errorTypes.includes("username") ? "error" : ""}
                    defaultValue={user.username}
                    autoComplete="username"
                /></div>

            <div>
                <label>Email</label>
                <input ref={emailInput}
                    type="email"
                    className={errorTypes.includes("email") ? "error" : ""}
                    defaultValue={user.email}
                    autoComplete="email"
                /></div>

            <div>
                <label>Bio</label>
                <textarea ref={bioInput}
                    type="text"
                    defaultValue={user.bio}
                    className={errorTypes.includes("bio") ? "error" : ""}
                />
            </div>

            <button
                disabled={loading}
                onClick={updateClicked}
            >Submit</button>

            <ul>
                {errorListItems}
            </ul>

        </div>
    );
}
