import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'

class Trailmarks extends Component {
  render () {
    const { trailmarks } = this.props

    if (trailmarks) {
      return (
        <div>
          <div className='row'>
            <div className='col-md-6'>
              <h2>
                {' '}
                <i class='far fa-compass'> Trails</i>
              </h2>
            </div>
            <div className='col-md-6' />
          </div>
          <table className='table table-striped'>
            <thead className='thead-inverse'>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {trailmarks.map(trail => (
                <tr key={trail.id}>
                  <td>
                    {trail.name}
                  </td>
                  <td>{trail.location}</td>
                  <td>{trail.summary}</td>
                  <td>
                    <Link
                      to={`/trail/${trail.id}`}
                      className='btn btn-secondary btn-sm'
                    >
                      <i className='fas fa-arrow-circle-right'> Details</i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    } else {
      return <h1>Loading...</h1>
    }
  }
}

Trailmarks.propTypes = {
  firestore: PropTypes.object.isRequired,
  trailmarks: PropTypes.array
}

export default compose(
  firestoreConnect([{ collection: 'trailmarks' }]),
  connect((state, props) => ({
    trailmarks: state.firestore.ordered.trailmarks
  }))
)(Trailmarks)
