import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './redux/store'
import App from './App';
import './index'


class Index extends React.Component {
  render() {
    return (
      <React.StrictMode>
        <App store={configureStore()} />
      </React.StrictMode>
    );
  }
}

export default Index