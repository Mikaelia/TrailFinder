import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { notifyUser } from "../../actions/notifyActions";
import Alert from "../layout/Alert";
import BlockQuote from "../layout/BlockQuote";
import styles from "../../styles/Login.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Login extends Component {
  state = {
    email: "",
    password: "",
    showForm: false
  };

  onSubmit = e => {
    e.preventDefault();
    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;

    firebase
      .login({ email, password })
      .catch(err => notifyUser("Invalid Login Credentials", "error"));
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  renderFlashMsg(message, messageType) {
    return message ? (
      <Alert message={message} messageType={messageType} />
    ) : (
      false
    );
  }

  render() {
    const { message, messageType } = this.props.notify;
    return (
      <div>
        {this.renderFlashMsg(message, messageType)}
        <BlockQuote />
        <div className={styles.login}>
          <div className="row">
            <div className="col-md-6 mx-auto">
              <div className={styles.card}>
                <div className={styles.cardBody}>
                  <h1
                    className={styles.cardHeader}
                    onClick={() =>
                      this.setState({ showForm: !this.state.showForm })
                    }
                  >
                    GET STARTED
                    {!this.state.showForm ? (
                      <small>
                        <div className={styles.icon}>
                          <i
                            className="icon-angle-double-down bounce"
                            style={{ display: "block", marginTop: "10px" }}
                          />
                        </div>
                      </small>
                    ) : null}
                  </h1>
                  {this.state.showForm ? (
                    <form autoComplete="nope" onSubmit={this.onSubmit}>
                      <div>
                        <label htmlFor="email" className={styles.label}>
                          EMAIL
                        </label>
                        <input
                          type="text"
                          className={styles.input}
                          name="email"
                          required
                          value={this.state.email}
                          onChange={this.onChange}
                          autoComplete="nope"
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
                          autoComplete="off"
                        />
                      </div>
                      <input
                        type="submit"
                        value="Submit"
                        className={styles.button}
                      />
                      <Link
                        to="/register"
                        className={styles.button}
                        style={{ marginTop: "0", textDecoration: "none" }}
                      >
                        New? Register Here
                      </Link>
                    </form>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  firebase: PropTypes.object.isRequired
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
)(Login);
