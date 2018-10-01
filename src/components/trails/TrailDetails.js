import React, { Component } from "react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import Spinner from "../layout/Spinner";
import TrailView from "./TrailView";
import TrailNoteForm from "./TrailNoteForm";

// Toggle Completed/ Not Completed
// Show Notes
// Show Name
// Share trail ( if time )

class TrailDetails extends Component {
  state = {
    showNotes: false
  };

  onDeleteClick = () => {
    const { trail, firestore, history } = this.props;

    firestore
      .delete({ collection: "trailmarks", doc: trail.id })
      .then(history.push("/trailmarks"));
  };

  render() {
    const { trail } = this.props;
    const { showNotes } = this.state;

    let notesForm = "";

    // Clickable Add Notes Form
    if (showNotes) {
      notesForm = <TrailNoteForm trail={trail} value={trail.notes} />;
    } else {
      notesForm = null;
    }

    if (trail) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/trailmarks" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" /> Back To Trailmarks
              </Link>
            </div>
          </div>

          <div className="card" />
          <div className="col-md-6">
            <div className="btn-group float-right">
              <button onClick={this.onDeleteClick} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
          <TrailView trailDetails={trail} />
          <a
            href="#!"
            onClick={() =>
              this.setState({
                showNotes: !this.state.showNotes
              })
            }
          >
            <i className="fas fa-pencil-alt" /> Trail Notes
          </a>
          {notesForm}
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
)(TrailDetails);
