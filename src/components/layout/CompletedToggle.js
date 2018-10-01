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

  static getDerivedStateFromProps(props, state) {
    const { trailmark } = props;

    console.log(trailmark);

    // return { totalOwed: total };
  }

  handleClick() {
    this.setState({ completed: !this.state.completed });
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
    { collection: "trailmarks", storeAs: "trailmark", doc: this.props }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    trailmark: ordered.trailmark && ordered.trailmark[0]
  }))
)(CompletedToggle);

//in preceeding, need to grab user id from firebase, pass through props. MAKE THIS AN ACTION
