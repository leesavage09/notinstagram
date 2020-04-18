import React from 'react';
import { Provider } from 'react-redux';
import Signup from './components/signup/signup'
import Login from './components/login/login'
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App({ store }) {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/">
              <Home></Home>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;

function Home() {
  return (
    <h1>Home page</h1>
  );
}
