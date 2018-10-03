// // Add comments
// // Add photos

// import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'
// import { compose } from 'redux'
// import { connect } from 'react-redux'
// import { firestoreConnect } from 'react-redux-firebase'
// import Spinner from '../layout/Spinner'

// class TrailNotes extends Component {
//   constructor (props) {
//     super(props)

//     this.notesInput = React.createRef()
//   }

//   onSubmit = e => {
//     e.preventDefault()

//     const { trail, firestore, history } = this.props
//     // Updated trail
//     const updTrail = {
//       notes: this.notesInput.current.value
//     }

//     // Update trail in firestore
//     firestore
//       .update({ collection: 'trailmarks', doc: trail.id }, updTrail)
//       .then(history.push('/trailmarks'))
//   }
//   render () {
//     const { trail } = this.props

//     if (trail) {
//       return (
//         <div>
//           <div className='row'>
//             <div className='col-md-6'>
//               <Link to='/' className='btn btn-link'>
//                 <i className='fas fa-arrow-circle-left' />
//                 Back To Trailmarks
//               </Link>
//             </div>
//           </div>

//           <div className='card'>
//             <div className='card-header'>Add a Note</div>
//             <div className='card-body'>
//               {/* each form input needs to be piece of state */}
//               <form onSubmit={this.onSubmit}>

//                 <div className='form-group'>
//                   <label htmlFor='notes'>Notes</label>
//                   <input
//                     type='text'
//                     className='form-control'
//                     name='notes'
//                     minLength='2'
//                     required
//                     ref={this.notesInput}
//                     defaultValue={trail.notes}
//                   />
//                 </div>

//                 {/* Add Image upload option */}

//                 <input
//                   type='submit'
//                   defaultValue='Submit'
//                   className='btn btn-primary btn-block'
//                 />
//               </form>
//             </div>
//           </div>
//         </div>
//       )
//     } else {
//       return <Spinner />
//     }
//   }
// }

// TrailNotes.propTypes = {
//   firestore: PropTypes.object.isRequired
// }

// export default compose(
//   firestoreConnect(props => [
//     { collection: 'trailmarks', storeAs: 'trail', doc: props.match.params.id }
//   ]),
//   connect(({ firestore: { ordered } }, props) => ({
//     trail: ordered.trail && ordered.trail[0]
//   }))
// )(TrailNotes)
