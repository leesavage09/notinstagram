import React from 'react';
import { Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history"
import { Provider } from 'react-redux';
import configureStore from './redux/store'
import * as Actions from './redux/actions/session_actions'
import { AuthRoute, ProtectedRoute } from './util/routes'
import Signup from './pages/signup'
import Login from './pages/login'
import AccountEdit from './pages/account/edit'
import Home from './pages/home'
import Explore from './pages/explore'
import CreateUserAvatar from './pages/create_user_avatar'
import CreatePostImage from './pages/create_post_image'
import CreatePost from './pages/create_post'
import Activity from './pages/activity'
import AccountOptions from './pages/account/options'
import PasswordChange from './pages/account/password_change'
import ChangeAvatarModal from './components/options_modal/change_avatar_modal'
import LogoutModal from './components/options_modal/logout_modal'
import ToastNotification from './components/toast_notification'
import Profile from './pages/profile'

class Index extends React.Component {
  render() {
    const store = configureStore()
    if (window.logged_in_user) {
      store.dispatch(Actions.loginSuccess(window.logged_in_user))
    }

    const history = createBrowserHistory()
    return (
      <React.StrictMode>
        <Provider store={store}>
          <Router history={history}>
            <Switch >
              <AuthRoute exact path="/signup" component={Signup} />
              <AuthRoute exact path="/login" component={Login} />
              <ProtectedRoute exact path="/explore" component={Explore} />
              <ProtectedRoute exact path="/create-user-avatar" component={CreateUserAvatar} />
              <ProtectedRoute exact path="/create-post-image" component={CreatePostImage} />
              <ProtectedRoute exact path="/create-post" component={CreatePost} />
              <ProtectedRoute exact path="/activity" component={Activity} />
              <ProtectedRoute exact path="/account/edit" component={AccountEdit} />
              <ProtectedRoute exact path="/account/options" component={AccountOptions} />
              <ProtectedRoute exact path="/account/password-change" component={PasswordChange} />
              <ProtectedRoute path="/profile" component={Profile} />
              <ProtectedRoute exact path="/" component={Home} />
            </Switch>
            <ChangeAvatarModal />
            <LogoutModal/>
            <ToastNotification />
          </Router>
        </Provider>
      </React.StrictMode>
    );
  }
}

export default Index