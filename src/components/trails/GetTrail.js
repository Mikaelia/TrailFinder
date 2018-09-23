import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

class GetTrail extends Component {
  state = {
    trails: []
  }

  componentDidMount () {
    // eventually you will use props for query params
    axios
      .get(
        'https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&maxResults=1&key=200339330-556c3c08bab51add2eafd094be79c93f'
      )
      .then(res => this.setState(res.data.trails[0]))

    // const trails = res.data
    // this.setState({ trails: { trails } })

    // Can split this into two components--send the response as props to display component.
  }

  render () {
    const {
      name,
      length,
      location,
      latitude,
      longitude,
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
          <li className='list-group-item'>
            Coordinates: {latitude}{longitude}
          </li>
          <li className='list-group-item'>Description: {summary}</li>
          <li className='list-group-item'>Difficulty: {difficulty}</li>
          <li className='list-group-item'>
            Rating: {stars} stars, {starVotes} reviews
          </li>
          <li className='list-group-item'>
            Elevation Change: {ascent}, {descent}
          </li>
          <li className='list-group-item'>
            Condition: {conditionDetails} <span> {conditionDate}</span>
          </li>
        </ul>
      </div>
    )
  }
}
export default GetTrail
