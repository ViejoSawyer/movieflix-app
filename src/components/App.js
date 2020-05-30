import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Movies from '../pages/Movies';
import Login from '../pages/Login';

function App() {
  const [name, setName] = useState('');
  return (
    <BrowserRouter>
      <Navbar name={name}>
        <Switch>
          <Route
            exact
            path='/'
            render={(props) => <Login {...props} setName={setName} />}
          />
          <Route exact path='/movies' component={Movies} />} />
        </Switch>
      </Navbar>
    </BrowserRouter>
  );
}

export default App;
