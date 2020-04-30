import React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/actions/session_actions'
import { Link, BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from './routes'
import Signup from './views/signup'
import Login from './views/login'
import EditUser from './views/edit_user'
import Home from './views/home'

function App({ store }) {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <AuthRoute path="/signup" component={Signup} />
            <AuthRoute exact path="/login" component={Login} />
            <ProtectedRoute path="/edit" component={EditUser} />
            <ProtectedRoute path="/test" component={Test} />
            <ProtectedRoute path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;

function Test() {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  function logoutClicked() {
    dispatch(logout())
  }
  return (
    <div>
      <h1>Home page!</h1>
      <p>Hi {user.name}<br />
        Your email is {user.email} and your username is {user.username}<br />
        Your Bio is {user.bio}</p>
      <p><a href='#' onClick={logoutClicked}>Log out</a></p>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      <p>Have an account? <Link to="/login">Log in</Link></p>
    </div>
  );
}