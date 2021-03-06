import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import Spinner from "../layout/Spinner";
import TrailView from "./TrailView";
import TrailNoteForm from "./TrailNoteForm";
import Button from "../layout/Button";
import Weather from "../weather/Weather";

// Toggle Completed/ Not Completed
// Show Notes
// Show Name
// Share trail ( if time )

class TrailDetails extends Component {
  state = {
    showNotes: false
  };

  onDeleteClick = () => {
    const { firestore, history } = this.props;
    const { id } = this.props.match.params;

    console.log(id);

    firestore
      .delete({ collection: "trailmarks", doc: id })
      .then(history.push("/trailmarks"));
  };

  render() {
    const { trails } = this.props;
    const { id } = this.props.match.params;
    const { showNotes } = this.state;
    let trail = null;
    let notesForm = null;

    if (!(Object.keys(trails).length === 0 && trails.constructor === Object)) {
      trail = trails.trailmarks[id];

      if (showNotes) {
        notesForm = (
          <TrailNoteForm
            trail={trail}
            id={id}
            notes={trail.notes}
            style={{ textOverflow: "wrap", display: "block " }}
          />
        );
      } else {
        notesForm = null;
      }
    }

    if (trail) {
      // Clickable Add Notes Form

      return (
        <div style={{ marginTop: "10vh" }}>
          <div style={{ marginTop: "5rem" }}>
            <Weather lat={trail.latitude} lng={trail.longitude} />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <Link
              to="/trailmarks"
              style={{ textDecoration: "none" }}
              className="btn btn-link"
            >
              <i className="fas fa-arrow-circle-left" /> Back To Trailmarks
            </Link>
          </div>

          <div style={{ padding: "3rem 2rem" }}>
            <TrailView trailDetails={trail}>
              <Button
                message="DELETE TRAIL"
                onClick={this.onDeleteClick}
                style={{ backgroundColor: "rgb(242, 64, 82)" }}
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
      );
    } else {
      return <Spinner />;
    }
  }
}

export default compose(
  firestoreConnect(["trailmarks"]),
  connect(state => ({
    trails: state.firestore.data
  }))
)(TrailDetails);
