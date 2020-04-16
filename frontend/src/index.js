import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './redux/store'
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App store={configureStore()} />
  </React.StrictMode>,
  document.getElementById('root')
);
