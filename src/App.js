import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth'

import store from './store'
import { Provider } from 'react-redux'

import AppNavbar from './components/layout/AppNavbar'
import Trailmarks from './components/trails/Trailmarks'
import AddTrail from './components/trails/GetTrail'
import TrailDetails from './components/trails/TrailDetails'
import TrailNotes from './components/trails/TrailNotes'
import FindTrail from './components/pages/FindTrail'
import Login from './components/auth/Login'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <AppNavbar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={UserIsAuthenticated(Login)} />
                <Route
                  exact
                  path='/login'
                  component={UserIsAuthenticated(Login)}
                />
                <Route
                  path='/findtrail'
                  component={UserIsAuthenticated(FindTrail)}
                />
                <Route
                  path='/trailmarks'
                  component={UserIsAuthenticated(TrailMarks)}
                />
                <Route
                  path='/trail/add'
                  component={UserIsAuthenticated(AddTrail)}
                />
                <Route
                  path='/trail/:id'
                  component={UserIsAuthenticated(TrailDetails)}
                />
                <Route
                  path='/trail/notes/:id'
                  component={UserIsAuthenticated(TrailNotes)}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
