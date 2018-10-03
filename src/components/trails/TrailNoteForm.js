import React, { Component } from "react";
// import PropTypes from 'prop-types'
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class TrailNoteForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: this.props.trail.notes
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.noteSubmit = this.noteSubmit.bind(this);
  }

  handleOnChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  noteSubmit(e) {
    e.preventDefault();
    const { trail, firestore } = this.props;
    const updTrail = {
      notes: this.state.notes
    };
    e.target.value = "";
    firestore.update({ collection: "trailmarks", doc: trail.id }, updTrail);
  }

  render() {
    return (
      <div style={{ height: "100vh" }}>
        <form onSubmit={this.noteSubmit}>
          <div className="input-group">
            <input
              style={{ overflow: "wrap", width: "50px" }}
              type="text"
              className="form-control"
              name="notes"
              placeholder="Add Note"
              value={this.state.notes}
              onChange={this.handleOnChange}
            />
            <div className="input-group-append">
              <input type="submit" value="Save" className="btn btn-dark" />
            </div>
          </div>
        </form>
        <div style={{ padding: "1rem" }}>{this.state.notes}</div>
      </div>
    );
  }
}

function getIDfromLocation() {
  return window.location.pathname.split("/trail/")[1];
}

export default compose(
  firestoreConnect(props => [
    { collection: "trailmarks", storeAs: "trail", doc: getIDfromLocation() }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    trail: ordered.trail && ordered.trail[0]
  }))
)(TrailNoteForm);
