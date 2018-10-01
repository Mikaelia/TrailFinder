import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import CompletedToggle from "../layout/CompletedToggle";

import styles from "../../styles/trailmarks.css";

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
        <div className="container mt-4">
          <h2
            style={{
              marginTop: "4rem",
              textAlign: "center"
            }}
          >
            {" "}
            TrailMarks
          </h2>
          <div className="row">
            <div className="col-md-6" />
            <div className="col-md-6" />
          </div>
          <table className={styles.table} style={{ marginTop: "4rem" }}>
            <thead className="thead-inverse">
              <tr>
                <th
                  className={styles.th}
                  style={{
                    borderTopLeftRadius: ".4rem",
                    borderBottomLeftRadius: ".4rem"
                  }}
                />

                <th className={styles.th}>Trail</th>
                <th className={styles.th}>Location</th>
                <th className={styles.th}>Description</th>

                <th
                  className={styles.th}
                  style={{
                    borderTopRightRadius: ".4rem",
                    borderBottomRightRadius: ".4rem"
                  }}
                >
                  {""}
                </th>
              </tr>
            </thead>
            <tbody>
              {usertrails.map(trail => (
                <tr key={trail.name} className={styles.card}>
                  <td>
                    <img
                      src={trail.imgMedium}
                      alt="Trail Pic"
                      className={styles.image}
                    />
                  </td>
                  <td className={styles.td}>{trail.name}</td>
                  <td className={styles.td}>{trail.location}</td>
                  <td className={styles.td}>{trail.summary}</td>

                  <td className={styles.td} style={{ verticalAlign: "center" }}>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
