import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";

import styles from "./dashboard.css";

import TrailView from "../trails/TrailView";
import Button from "../layout/Button";
import Spinner from "../layout/Spinner";
import TrailNoteForm from "../trails/TrailNoteForm";
import DashMapView from "../maps/DashMapView";

class Dashboard extends Component {
  state = {
    showNotes: false
  };

  componentDidMount() {}

  onDeleteClick = () => {
    const { trail, firestore, history } = this.props;

    firestore
      .delete({ collection: "trailmarks", doc: trail.id })
      .then(history.push("/trailmarks"));
  };

  render() {
    const { trail } = this.props;
    console.log(this.props);
    console.log(this.props.match.id);
    const { showNotes } = this.state;

    let notesForm = "";

    // Clickable Add Notes Form
    if (showNotes) {
      notesForm = (
        <TrailNoteForm
          trail={trail}
          value={trail.notes}
          style={{ textOverflow: "wrap" }}
        />
      );
    } else {
      notesForm = null;
    }

    if (trail) {
      console.log(trail.id);
      return (
        // Grid Container
        <div className={styles.gcontainer}>
          {/* Left Div */}

          <div className={styles.leftcontainer}>
            <div
              style={{
                textDecoration: "none!",
                backgroundColor: "rgba(6, 106, 255, 0.104)"
              }}
            >
              <Link to="/trailmarks" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" /> Back To Trailmarks
              </Link>
            </div>
            <div>
              <TrailView trailDetails={trail} styles={{ fontSize: "1rem" }}>
                <Button
                  message="Delete Trail"
                  onClick={this.onDeleteClick}
                  style={{
                    backgroundColor: "rgb(242, 64, 82)",
                    marginBottom: "0"
                  }}
                />

                <Button
                  message="ADD A NOTE! "
                  onClick={() =>
                    this.setState({
                      showNotes: !this.state.showNotes
                    })
                  }
                  style={{
                    marginBottom: "0"
                  }}
                >
                  <i className="fas fa-pencil-alt" />
                </Button>
                {notesForm}
              </TrailView>
            </div>
          </div>

          {/* Right DIV */}
          <div className={styles.rightcontainer}>
            {/* MAP DIV */}
            <div className={styles.splitcontainer}>
              <h1 className={styles.locationHeader}>Directions</h1>
              <DashMapView lat={trail.lat} lng={trail.lng} />
            </div>
            <div className={styles.splitcontainer} />
            Empty Container
          </div>

          {/* NOTES DIV */}
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
      storeAs: "trail",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    trail: ordered.trail && ordered.trail[0]
  }))
)(Dashboard);
