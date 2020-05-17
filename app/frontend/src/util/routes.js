import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import React from 'react'
import { useSelector } from 'react-redux'
import * as SessionSelector from '../redux/selectors/session_selector'

const Auth = ({ component: Component, path, exact }) => {
    const loggedIn = useSelector(SessionSelector.loggedInUser())
    return (
        <Route path={path} exact={exact} render={(props) => (
            !loggedIn ? (
                <Component {...props} />
            ) : (
                    <Redirect to="/" />
                )
        )} />
    )
}


const Protected = ({ component: Component, path, exact }) => {
    const loggedIn = useSelector(SessionSelector.loggedInUser())
    return (
        <Route path={path} exact={exact} render={(props) => (
            loggedIn ? (
                <Component {...props} />
            ) : (
                    <Redirect to="/login" />
                )
        )} />
    )
}

export const AuthRoute = withRouter(Auth);
export const ProtectedRoute = withRouter(Protected);