import React from 'react';
import { Provider } from 'react-redux';
import Signup from './views/signup/signup'
import Login from './views/login/login'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";

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
            <Route path="/home">
              <Home store={store}></Home>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;

function Home({store}) {
  return (
    <div>
      <h1>Home page!</h1>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      <p>Have an account? <Link to="/login">Log in</Link></p>
      <p>{console.log(store.getState())}</p>
    </div>
  );
}
