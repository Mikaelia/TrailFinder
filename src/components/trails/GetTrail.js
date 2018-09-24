import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { firestoreConnect } from 'react-redux-firebase'

class GetTrail extends Component {
  state = {
    trails: []
  }

  componentDidMount () {
    const { lat, lng } = this.props

    axios
      .get(
        `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&maxDistance=10&maxResults=1&key=200339330-556c3c08bab51add2eafd094be79c93f`
      )
      .then(res => {
        const trails = res.data.trails.map(el => {
          el.trailID = el.id
          delete el.id

          return el
        })

        this.setState(trails[0])
      })
  }

  onClick = e => {
    const newTrail = this.state
    const { firestore } = this.props

    firestore
      .add({ collection: 'trailmarks' }, newTrail)
      .then(console.log('successs!'))
  }

  render () {
    const {
      name,
      length,
      location,
      summary,
      difficulty,
      stars,
      starVotes,
      url,
      imgMedium,
      ascent,
      descent,
      conditionDetails,
      conditionDate
    } = this.state
    return (
      <div className='card'>
        <h3 className='card-header'>
          Your Trail
        </h3>
        <ul className='list-group'>
          <li className='list-group-item'>
            <img src={imgMedium} alt='trailpic' />
          </li>
          <li className='list-group-item'>Name: {name}</li>
          <li className='list-group-item'>Link: {url}</li>
          <li className='list-group-item'>Length: {length}</li>
          <li className='list-group-item'>Location: {location}</li>
          <li className='list-group-item'>Description: {summary}</li>
          <li className='list-group-item'>Difficulty: {difficulty}</li>
          <li className='list-group-item'>
            Rating: {stars} stars, {starVotes} reviews
          </li>
          <li className='list-group-item'>
            Elevation Change: {ascent}, {descent}
          </li>
          <li className='list-group-item'>
            Condition Details: {conditionDetails} <span> {conditionDate}</span>
          </li>
        </ul>
        <button onClick={this.onClick}>Save Trail</button>
      </div>
    )
  }
}
export default firestoreConnect()(GetTrail)
