
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Job from '../job'
import Jobs from '../jobs'
import NotFound from '../not-found'

import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import './app.css'

const history = createBrowserHistory()

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <header className='header'>
            <Link className='logo' to='/'>Job Bid</Link>
          </header>          
          <Switch>
            <Route
              path='/'
              exact
              component={Jobs} />
            <Route
              path='/jobs/:id'
              component={Job} />
            <Route
              component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
