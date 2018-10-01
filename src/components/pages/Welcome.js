import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firebaseConnect } from "react-redux-firebase";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import styles from "../../styles/page.css";

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: ""
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    console.log(auth.uid);
  }

  render() {
    return (
      <div classname="container">
        <div className={styles.light}>
          <h1>Welcome</h1>
        </div>
        <div className={styles.dark}>
          <Link to="/mapview" className={styles.button}>
            {" "}
            Let's Get Started
          </Link>
        </div>
      </div>
    );
  }
}

export default compose(
  firebaseConnect(),
  firestoreConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(Welcome);
