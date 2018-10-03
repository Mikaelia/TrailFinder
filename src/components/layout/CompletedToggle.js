import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class CompletedToggle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { trailid, firestore } = this.props;

    this.setState({ completed: !this.state.completed });
    const updTrail = {
      status: this.state.completed
    };

    firestore.update({ collection: "trailmarks", doc: trailid }, updTrail);
    console.log("handled");
    console.log(this.state);
  }

  //////////////////
  // balanceSubmit = e => {
  //   e.preventDefault();

  //   const { user, firestore } = this.props;
  //   const { completed } = this.state;

  //   const clientUpdate = {
  //     balance: parseFloat(balanceUpdateAmount)
  //   };

  //   // Update in firestore
  //   firestore.update({ collection: "users", doc: user.id }, clientUpdate);
  // };
  /////////////////////////

  render() {
    console.log(this.props);
    const { completed } = this.state;
    console.log({ completed });

    const icon = (
      <span
        className={classnames({
          "text-success": completed,
          "text-danger": !completed
        })}
      >
        <i
          className={classnames({
            "fas fa-check fa-lg": completed,
            "fas fa-times fa-lg": !completed
          })}
          style={{ display: "inline" }}
          onClick={this.handleClick}
        />
      </span>
    );
    return icon;
  }
}

export default compose(
  firestoreConnect(props => [
    { collection: "trailmarks", storeAs: "trail", doc: props.trailid }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    trailmark: ordered.trailmark && ordered.trailmark[0]
  }))
)(CompletedToggle);

//in preceeding, need to grab user id from firebase, pass through props. MAKE THIS AN ACTION
