import React from 'react';
import { Provider } from 'react-redux';
import Signup from './components/signup/signup'

function App({ store }) {
  return (
    <Provider store={store}>
      <div className="App">
        <Signup />
      </div>
    </Provider>
  );
}

export default App;
