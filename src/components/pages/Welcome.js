import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { firebaseConnect } from 'react-redux-firebase'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from "redux";
import { connect } from "react-redux";

class Welcome extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      uid: ''
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    console.log(auth.uid)
  }


  render() {
    return (
      <div>
        
    <h1>Welcome</h1>
    <Link to="/mapview" className="btn btn-dark">
      {" "}
      Let's Get Started
    </Link>
      </div>
    )
  }
}

export default compose(
  firebaseConnect(),
  firestoreConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(Welcome);

