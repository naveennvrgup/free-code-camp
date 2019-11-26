import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/app.css'

import List from './components/list';
import Add from './components/add'
import Edit from './components/edit'
import View from './components/view'
import State from './components/state'

class App extends Component {
  render() {
    return (
      <div className="App shadow p-5">
        <Switch>
          <Route path='/contact/edit/:id' component={Add} />
          <Route path='/contact/:id' component={View} />
          <Route path='/add/' component={Add} />
          <Route path='' component={List} />
        </Switch>
        <State />
      </div>
    );
  }
}

export default App;
