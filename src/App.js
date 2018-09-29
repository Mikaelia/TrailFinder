import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helpers/auth";

import store from "./store";
import { Provider } from "react-redux";

import AppNavbar from "./components/layout/AppNavbar";
import Trailmarks from "./components/trails/Trailmarks";
import TrailDetails from "./components/trails/TrailDetails";
import TrailNotes from "./components/trails/TrailNotes";
import FindTrail from "./components/pages/FindTrail";
import Welcome from "./components/pages/Welcome";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import MapView from "./components/maps/MapView";
import Test from "./components/maps/Test";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <Switch>
              <Route path="/test" component={UserIsAuthenticated(Test)} />
              <Route exact path="/" component={UserIsAuthenticated(Welcome)} />
              <Route
                exact
                path="/login"
                component={UserIsNotAuthenticated(Login)}
              />
              <Route
                path="/register"
                component={UserIsNotAuthenticated(Register)}
              />
              <Route
                path="/trailmarks"
                component={UserIsAuthenticated(Trailmarks)}
              />
              <Route
                path="/trail/:id"
                component={UserIsAuthenticated(TrailDetails)}
              />
              <Route
                path="/trail/notes/:id"
                component={UserIsAuthenticated(TrailNotes)}
              />
              <Route path="/mapview" component={UserIsAuthenticated(MapView)} />
              <Route
                path="/returntrail/:lat/:lng"
                component={UserIsAuthenticated(FindTrail)}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
