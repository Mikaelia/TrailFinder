import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import CompletedToggle from "../layout/CompletedToggle";

import styles from "../../styles/trailmarks1.css";

class Trailmarks extends Component {
  // getting from redux

  render() {
    const { trailmarks } = this.props;
    const { auth } = this.props;

    console.log(trailmarks);

    if (trailmarks) {
      const usertrails = trailmarks.filter(trailmark => {
        return trailmark["uid"] === auth.uid;
      });

      return (
        <div>
          <div style={{ padding: "5rem", height: "50px" }}>
            <h2
              style={{
                marginTop: "4rem",
                textAlign: "center"
              }}
            >
              {" "}
              TrailMarks
            </h2>
          </div>
          <div className={styles.scrollbar} style={{ height: "3576px" }}>
            {usertrails.map(trail => (
              <div className={styles.block}>
                <div className={styles.picture}>
                  <img
                    src={trail.imgMedium}
                    alt="Trail Pic"
                    className={styles.image}
                  />
                </div>

                <div className={styles.buttons}>
                  <CompletedToggle
                    trailid={trail.id}
                    style={{
                      paddingLeft: "3rem"
                    }}
                  />

                  <Link to={`/trail/${trail.id}`}>
                    <i
                      className="fas fa-angle-double-right fa-lg"
                      style={{
                        paddingLeft: "2rem",
                        paddingRight: "1rem",
                        ":hover": "color: rgb(223, 35, 2)",
                        display: "inline"
                      }}
                    />
                  </Link>
                </div>

                <div className={styles.info}>
                  <div>{trail.name}</div>
                  <div>{trail.location}</div>
                  <div>{trail.summary}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Trailmarks.propTypes = {
  firestore: PropTypes.object.isRequired,
  trailmarks: PropTypes.array
};

export default compose(
  firebaseConnect(),
  firestoreConnect([{ collection: "trailmarks" }]),
  connect((state, props) => ({
    trailmarks: state.firestore.ordered.trailmarks,
    auth: state.firebase.auth
  }))
)(Trailmarks);
