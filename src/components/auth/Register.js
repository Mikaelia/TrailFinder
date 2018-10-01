import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { notifyUser } from "../../actions/notifyActions";
import Alert from "../layout/Alert";
import styles from "../../styles/Login.css";

class Register extends Component {
  state = {
    email: "",
    password: ""
  };

  onSubmit = e => {
    e.preventDefault();

    const { firebase, notifyUser, history } = this.props;
    const { email, password } = this.state;

    // Register with firebase
    firebase
      .createUser({ email, password })
      .catch(err => notifyUser(err.message, "error"));
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { message, messageType } = this.props.notify;
    return (
      <div>
        <div className="row">
          <div className="col-md-6 mx-auto">
            {message ? (
              <Alert message={message} messageType={messageType} />
            ) : null}
            <div className={styles.card}>
              <div className={styles.cardBody}>
                <h1 className={styles.cardHeader}>Register</h1>
                <form onSubmit={this.onSubmit}>
                  <div>
                    <label htmlFor="email" className={styles.label}>
                      Email
                    </label>
                    <input
                      type="text"
                      className={styles.input}
                      name="email"
                      required
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className={styles.label}>
                      Password
                    </label>
                    <input
                      type="password"
                      className={styles.input}
                      name="password"
                      required
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Register"
                    className={styles.button}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Register.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
};

// any actions need to be added in as a property (i.e. notifyUser)
export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify
    }),
    { notifyUser }
  )
)(Register);
