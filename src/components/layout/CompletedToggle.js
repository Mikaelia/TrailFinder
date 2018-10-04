import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class CompletedToggle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hikedStatus: false
    };

    this.updateStatus = this.updateStatus.bind(this);
  }
  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    if (localStorage.hasOwnProperty(this.props.trailid)) {
      let value = localStorage.getItem(this.props.trailid);
      try {
        value = JSON.parse(value);
        this.setState({ hikedStatus: value });
      } catch (e) {
        this.setState({ hikedStatus: value });
      }
    }
  }

  saveStateToLocalStorage() {
    localStorage.setItem(
      this.props.trailid,
      JSON.stringify(this.state.hikedStatus)
    );
    console.log("saved");
  }

  updateStatus() {
    // update react state

    this.setState({ hikedStatus: !this.state.hikedStatus });
  }

  render() {
    const { hikedStatus } = this.state;

    const icon = (
      <span
        className={classnames({
          "text-success": hikedStatus,
          "text-danger": !hikedStatus
        })}
      >
        <i
          className={classnames({
            "fas fa-check fa-lg": hikedStatus,
            "fas fa-times fa-lg": !hikedStatus
          })}
          style={{ display: "inline" }}
          onClick={this.updateStatus}
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
    trailmark: ordered.trail && ordered.trail[0]
  }))
)(CompletedToggle);

//in preceeding, need to grab user id from firebase, pass through props. MAKE THIS AN ACTION
