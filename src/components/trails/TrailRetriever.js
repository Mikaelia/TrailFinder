import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { firestoreConnect } from 'react-redux-firebase'
import TrailView from './TrailView'

class TrailRetriever extends Component {
  state = {
    trails: []
  }

  componentDidMount () {
    const { lat, lng } = this.props
    console.log(`${lat}${lng}`)

    axios
      .get(
        `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&maxDistance=100&maxResults=200&key=200339330-556c3c08bab51add2eafd094be79c93f`
      )
      .then(res => {
        const random = Math.floor(Math.random() * 200)
        const trails = res.data.trails.map(el => {
          el.trailID = el.id
          delete el.id
          el.hikedStatus = false

          return el
        })

        this.setState(trails[random])
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
    return (
      <div className='card'>
        <h3 className='card-header'>
          Your Trail
        </h3>
        <TrailView trailDetails = {this.state}
         />
        <button onClick={this.onClick}>Save Trail</button>
      </div>
    )
  }
}
export default firestoreConnect()(TrailRetriever)
