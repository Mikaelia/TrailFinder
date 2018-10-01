import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { firestoreConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'

class Trailmarks extends Component {

  // getting from redux

  render () {
    const { trailmarks } = this.props
    const {auth} = this.props
    console.log(trailmarks)

    if (trailmarks) {
      const usertrails = trailmarks.filter(trailmark => {
        console.log(trailmark['user'] == (auth.uid))
        console.log(trailmark['user'])
        console.log(auth.uid)
        return trailmark['user'] == auth.uid
      })
  
      return (
        <div>
          <div className='row'>
            <div className='col-md-6'>
              <h2>
                {' '}
                <i className='far fa-compass'> Trails</i>
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
              {usertrails.map(elem => (
                <tr key={elem.trail.id}>
                  <td>
                    {elem.trail.name}
                  </td>
                  <td>{elem.trail.location}</td>
                  <td>{elem.trail.summary}</td>
                  <td>
                    <Link
                      to={`/trail/${elem.trail.id}`}
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
      return <Spinner />
    }
  }
}

Trailmarks.propTypes = {
  firestore: PropTypes.object.isRequired,
  trailmarks: PropTypes.array
}

export default compose(
  firebaseConnect(),
  firestoreConnect([{ collection: 'trailmarks' }]),
  connect((state, props) => ({
    trailmarks: state.firestore.ordered.trailmarks,
    auth: state.firebase.auth
  }))
)(Trailmarks)
