import React, { Component } from "react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import Spinner from "../layout/Spinner";
import TrailView from "./TrailView";
import TrailNoteForm from "./TrailNoteForm";
import Button from "../layout/Button";

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
          <div>
            <Link to="/trailmarks" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back To Trailmarks
            </Link>
          </div>

          <div style={{ padding: "3rem 10rem" }}>
            <TrailView trailDetails={trail}>
              <Button
                message="Delete Trail"
                onClick={this.onDeleteClick}
                style={{ backgroundColor: "rgb(242, 64, 82)" }}
              />
              {notesForm}
            </TrailView>
          </div>
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
