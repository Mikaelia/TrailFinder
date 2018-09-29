import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

// this will have state, so we are using a class
class AppNavbar extends Component {
  state = {
    isAuthenticated: false
  };

  // whenever we want to get something from redux state, use getDerivedStateFromProps

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;
    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  onLogoutClick = e => {
    e.preventDefault();

    const { firebase } = this.props;
    firebase.logout();
  };

  render() {
    const { isAuthenticated } = this.state;
    const { auth } = this.props;

    return (
      <nav className="navbar navbar-expand-md">
        <div className="container">
          <Link to="/" className="navbar-brand">
            TRAILFINDER
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav mr-auto">
              {isAuthenticated ? (
                <ul className="navbar-nav ml-auto">
                  <li className="nav-link">
                    <Link to="/mapview" className="nav-link">
                      FIND
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link to="/trailmarks" className="nav-link">
                      TRAILMARKS
                    </Link>
                  </li>
                </ul>
              ) : null}
            </ul>
            {isAuthenticated ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="#!" className="nav-link">
                    {auth.email}
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#!"
                    className="nav-link"
                    onClick={this.onLogoutClick}
                  >
                    LOGOUT
                  </a>
                </li>
              </ul>
            ) : null}
            {!isAuthenticated ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    LOGIN
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    REGISTER
                  </Link>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    );
  }
}

AppNavbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

// use compose to export firebase connect and regular connect
// below, auth is put into a prop

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(AppNavbar);
