import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import styles from "./dashboard.css";

import TrailView from "../trails/TrailView";
import Button from "../layout/Button";
import Spinner from "../layout/Spinner";
import TrailNoteForm from "../trails/TrailNoteForm";

class Dashboard extends Component {
  render() {
    const { trail } = this.props;

    if (trail) {
      return (
        // Grid Container
        <div className={styles.gcontainer}>
          {/* Left Div */}

          <div className={styles.leftcontainer}>
            <div className={styles.splitcontainer}>
              <TrailView trailDetails={trail} styles={{ fontSize: "1rem" }}>
                <Button
                  message="Delete Trail"
                  onClick={this.onDeleteClick}
                  style={{
                    backgroundColor: "rgb(242, 64, 82)",
                    marginBottom: "0"
                  }}
                />
              </TrailView>
            </div>
          </div>

          {/* Right DIV */}
          <div className={styles.rightcontainer}>
            {/* MAP DIV */}
            <div className={styles.splitcontainer}>
              <h1>MAP GOES HERE</h1>
            </div>
            {/* NOTES DIV */}
            <div className={styles.splitcontainer}>
              <TrailNoteForm trail={trail} value={trail.notes} />
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

export default compose(
  firestoreConnect(props => [
    {
      collection: "trailmarks",
      doc: props.match.params.id,
      storeAs: "trail"
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    trail: ordered.trail && ordered.trail[0]
  }))
)(Dashboard);
