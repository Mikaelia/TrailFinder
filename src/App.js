import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'

import Header from './components/layout/Header'
import Trailmarks from './components/trail/Trailmarks'
import Login from './components/login/Login'
import AddTrail from './components/trails/AddTrail'
import TrailDetails from './components/trails/TrailDetails'
import TrailNotes from './components/trails/TrailNotes'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Header branding='Trail Finder' />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/trailmarks' component={Trailmarks} />
                <Route exact path='/trail/add' component={AddTrail} />
                <Route exact path='/trail/:id' component={TrailDetails} />
                <Route exact path='/trail/notes/:id' component={TrailNotes} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
