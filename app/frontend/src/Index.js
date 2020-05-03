import React from 'react';
import { BrowserRouter, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import configureStore from './redux/store'
import * as Actions from './redux/actions/session_actions'
import { AuthRoute, ProtectedRoute } from './util/routes'
import './index'
import Signup from './pages/signup'
import Login from './pages/login'
import EditUser from './pages/edit_user'
import Home from './pages/home'
import Explore from './pages/explore'
import CreateImage from './pages/create_image'
import CreatePost from './pages/create_post'
import Activity from './pages/activity'
import Account from './pages/account'
import Options from './pages/options'

class Index extends React.Component {
  render() {
    const store = configureStore()
    if (window.logged_in_user) {
      store.dispatch(Actions.loginUserSuccess(window.logged_in_user))
    }
    return (
      <React.StrictMode>
        <Provider store={store}>
          <div className="App">
            <BrowserRouter>
              <Switch>
                <AuthRoute path="/signup" component={Signup} />
                <AuthRoute exact path="/login" component={Login} />
                <ProtectedRoute path="/edit" component={EditUser} />
                <ProtectedRoute path="/explore" component={Explore} />
                <ProtectedRoute path="/create-image" component={CreateImage} />
                <ProtectedRoute path="/create-post" component={CreatePost} />
                <ProtectedRoute path="/activity" component={Activity} />
                <ProtectedRoute path="/account" component={Account} />
                <ProtectedRoute path="/options" component={Options} />
                <ProtectedRoute path="/" component={Home} />
              </Switch>
            </BrowserRouter>
          </div>
        </Provider>
      </React.StrictMode>
    );
  }
}

export default Index