import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import styles from "../../styles/AppNavbar.css";

// this will have state, so we are using a class
class AppNavbar extends Component {
  state = {
    isAuthenticated: false,
    toggleShow: true
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
      <nav className={styles.navbar}>
        <span className={styles.toggle} id="js-navbar-toggle">
          <i
            className="fas fa-bars"
            onClick={() =>
              this.setState({ toggleShow: !this.state.toggleShow })
            }
          />
        </span>
        <a href="#!" className={styles.logo}>
          <div className={styles.compass}>
            <i class="far fa-compass fa-2x" />
          </div>
          <Link to="/" className={styles.branding}>
            <span style={{ fontWeight: 600 }}>TRAIL</span>
            FINDER
          </Link>
        </a>

        {isAuthenticated ? (
          <ul
            className={
              this.state.toggleShow ? `${styles.active}` : `${styles.mainNav}`
            }
            id="jsMenu"
          >
            <li className={styles.navli}>
              <Link to="/mapview" className={styles.navlinks}>
                FIND
              </Link>
            </li>

            <li className={styles.navli}>
              <Link to="/trailmarks" className={styles.navlinks}>
                TRAILMARKS
              </Link>
            </li>

            <li className={styles.navli}>
              <a href="#!" className={styles.navlinks}>
                {auth.email}
              </a>
            </li>

            <li className={styles.navli}>
              <a
                href="#!"
                className={styles.navlinks}
                onClick={this.onLogoutClick}
              >
                LOGOUT
              </a>
            </li>
          </ul>
        ) : (
          <ul
            className={
              this.state.toggleShow ? `${styles.active}` : `${styles.mainNav}`
            }
            id="jsMenu"
          >
            <li className={styles.navli}>
              <Link to="/login" className={styles.toplink}>
                LOGIN
              </Link>
            </li>

            <li className={styles.navli}>
              <Link to="/register" className={styles.navlinks}>
                REGISTER
              </Link>
            </li>
          </ul>
        )}
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
