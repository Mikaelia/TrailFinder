import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import Spinner from '../layout/Spinner'
import classnames from 'classnames'
import TrailView from './TrailView'

// Toggle Completed/ Not Completed
// Show Notes
// Show Name
// Share trail ( if time )

class TrailDetails extends Component {
  state = {
    notes: '',
    completed: false
  }

  // Store note in DB
  noteSubmit = e => {
    e.preventDefault()

    const { trail, firestore} = this.props

    const updTrail = {
      notes: this.state.notes,
      completed: this.state.completed
    }

    firestore
      .update({ collection: 'trailmarks', doc: trail.id }, updTrail)
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  onDeleteClick = () => {
    const { trail, firestore, history } = this.props

    firestore
      .delete({ collection: 'trailmarks', doc: trail.id })
      .then(history.push('/trailmarks'))
  }

  render () {
    const { trail } = this.props
    const { notes } = this.state

    console.log({ trail })

    // Notes Form

    let notesForm = (
      <form onSubmit={this.noteSubmit}>
        <div className='input-group'>
          <input
            type='text'
            className='form-control'
            name='notes'
            placeholder='Add Note'
            value={notes}
            onChange={this.onChange}
          />
          <div className='input-group-append'>
            <input
              type='submit'
              value='Update'
              className='btn btn-outline-dark'
            />
          </div>
        </div>
      </form>
    )

    if (trail) {
      console.log(trail)
      return (
       
        <div>
          <div className='row'>
            <div className='col-md-6'>
              <Link to='/trailmarks' className='btn btn-link'>
                <i className='fas fa-arrow-circle-left' /> Back To Trailmarks
              </Link>
            </div>

          {/* Show Completed */}
          <div className='col-md-4 col-sm-6'>
            <h3 className='pull-right'>
              Completed:{' '}
              <span
                className={classnames({
                  'text-danger': !trail.completed,
                  'text-success': trail.completed
                })}
              />{' '}
              <small>
                <a
                  href='#!'
                  onClick={() =>
                    this.setState({
                      completed: !this.state.completed
                    })}
                />
              </small>
            </h3>
            {notesForm}
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
          <TrailView trailDetails={trail}/>


          <hr />
          <div className='card'>
            <div className='card-body'>
              <hr />
              <li className='list-group-item'>
                Notes: {trail.notes}
              </li>
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
