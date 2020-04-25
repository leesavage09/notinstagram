import React from 'react';
import configureStore from './redux/store'
import App from './App';
import './index'
import * as Actions from './redux/actions/session_actions'

class Index extends React.Component {
  render() {
    const store = configureStore()
    if (window.logged_in_user) {
      store.dispatch(Actions.loginUserSuccess(window.logged_in_user))
    }
    return (
      <React.StrictMode>
        <App store={store} />
      </React.StrictMode>
    );
  }
}

export default Index