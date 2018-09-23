import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import Spinner from '../layout/Spinner'

class TrailDetails extends Component {
  onDeleteClick = () => {
    const { trail, firestore, history } = this.props

    firestore
      .delete({ collection: 'trailmarks', doc: trail.id })
      .then(history.push('/'))
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  render () {
    const { trail } = this.props
    if (trail) {
      return (
        <div>
          <div className='row'>
            <div className='col-md-6'>
              <Link to='/trailmarks' className='btn btn-link'>
                <i className='fas fa-arrow-circle-left' /> Back To Trailmarks
              </Link>
            </div>

            <div className='col-md-6'>
              <div className='btn-group float-right'>
                <Link to={`/trail/notes/${trail.id}`} className='btn btn-dark'>
                  Trail Notes
                </Link>
                <button onClick={this.onDeleteClick} className='btn btn-danger'>
                  Delete
                </button>
              </div>
            </div>
          </div>

          <hr />
          <div className='card'>
            <h3 className='card-header'>
              {trail.name}
            </h3>
            <div className='card-body'>
              <hr />
              <ul className='list-group'>
                <li className='list-group-item'>
                  Location: {trail.location}
                </li>
                <li className='list-group-item'>
                  Length: {trail.length}
                </li>
                <li className='list-group-item'>
                  Notes: {trail.notes}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    } else {
      return <Spinner />
    }
  }
}
TrailDetails.propTypes = {
  firestore: PropTypes.object.isRequired
}

export default compose(
  firestoreConnect(props => [
    { collection: 'trailmarks', storeAs: 'trail', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    trail: ordered.trail && ordered.trail[0]
  }))
)(TrailDetails)
