import React from 'react';
import { Router, Switch } from "react-router-dom";
import {createBrowserHistory} from "history"
import { Provider } from 'react-redux';
import configureStore from './redux/store'
import * as Actions from './redux/actions/session_actions'
import { AuthRoute, ProtectedRoute } from './util/routes'
import * as UiActions from './redux/actions/ui_actions'
import Signup from './pages/signup'
import Login from './pages/login'
import AccountEdit from './pages/account/edit'
import Home from './pages/home'
import Explore from './pages/explore'
import CreateProfileImage from './pages/create_profile_image'
import CreatePostImage from './pages/create_post_image'
import CreatePost from './pages/create_post'
import Activity from './pages/activity'
import Account from './pages/account'
import AccountOptions from './pages/account/options'
import PasswordChange from './pages/account/password_change'

class Index extends React.Component {
  render() {
    const store = configureStore()
    if (window.logged_in_user) {
      store.dispatch(Actions.loginUserSuccess(window.logged_in_user))
    }

    const history = createBrowserHistory()
    history.listen((location, action) => {
      store.dispatch(UiActions.clearMessages())
    })
    return (
      <React.StrictMode>
        <Provider store={store}>
          <div className="App">
            <Router history={history}>
              <Switch >
                <AuthRoute exact path="/signup" component={Signup} />
                <AuthRoute exact path="/login" component={Login} />
                <ProtectedRoute exact path="/explore" component={Explore} />
                <ProtectedRoute exact path="/create-profile-image" component={CreateProfileImage} />
                <ProtectedRoute exact path="/create-post-image" component={CreatePostImage} />
                <ProtectedRoute exact path="/create-post" component={CreatePost} />
                <ProtectedRoute exact path="/activity" component={Activity} />
                <ProtectedRoute exact path="/account/edit" component={AccountEdit} />
                <ProtectedRoute exact path="/account" component={Account} />
                <ProtectedRoute exact path="/account/options" component={AccountOptions} />
                <ProtectedRoute exact path="/account/password-change" component={PasswordChange} />
                <ProtectedRoute exact path="/" component={Home} />
              </Switch>
            </Router>
          </div>
        </Provider>
      </React.StrictMode>
    );
  }
}

export default Index