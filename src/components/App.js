import React, { Component } from 'react';
import '../styles/App.css';
import { Route, Switch } from 'react-router-dom';

import Login from './Login'
import Navbar from './Navbar'
import Home from './Home'

class App extends Component {
  render() {
  return (
    <div className="center w85">
      <Navbar />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </div>
  )
}
}

export default App;
