import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { notifyUser } from "../../actions/notifyActions";
import Alert from "../layout/Alert";
import "../../styles/Login.css";

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

  render() {
    const { message, messageType } = this.props.notify;
    return (
      <div className="login">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="login-card">
              <div className="card-body">
                {message ? (
                  <Alert message={message} messageType={messageType} />
                ) : null}
                <h1
                  className="login-header"
                  onClick={() =>
                    this.setState({ showForm: !this.state.showForm })
                  }
                >
                  LOGIN
                  {!this.state.showForm ? (
                    <small>
                      <i
                        className="icon-angle-double-down bounce"
                        style={{ display: "block", marginTop: "10px" }}
                      />
                    </small>
                  ) : null}
                </h1>
                {this.state.showForm ? (
                  <form autoComplete="nope" onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label htmlFor="email">EMAIL</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        required
                        value={this.state.email}
                        onChange={this.onChange}
                        autoComplete="nope"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
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
                      className="btn btn-block"
                    />
                  </form>
                ) : null}
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
