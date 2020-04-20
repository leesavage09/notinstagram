import React from 'react';
import configureStore from './redux/store'
import App from './App';
import './index'


class Index extends React.Component {
  render() {
    let store
    if (window.logged_in_user) {
      store = configureStore({
        session: {
          user: {
            bio: window.logged_in_user.bio,
            email: window.logged_in_user.email,
            name: window.logged_in_user.name,
            username: window.logged_in_user.username
          }
        }
      })
      delete window.logged_in_user
    } else {
      store = configureStore()
    }
    return (
      <React.StrictMode>
        <App store={store} />
      </React.StrictMode>
    );
  }
}

export default Index