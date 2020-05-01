import { useSelector, useDispatch } from 'react-redux'
import React from 'react';
import {logout} from '../redux/actions/session_actions'  
import MobileHeader from '../components/protected_container'

export default function Home() {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
  
    function logoutClicked() {
      dispatch(logout())
    }
    return (
            <MobileHeader>
            <h1>Home page!</h1>
            <p>Hi {user.name}<br />
                Your email is {user.email} and your username is {user.username}<br />
                Your Bio is {user.bio}</p>
            <p><a href='#' onClick={logoutClicked}>Log out</a></p>
            </MobileHeader>
    );
}
