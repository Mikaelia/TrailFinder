import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { firebaseConnect } from 'react-redux-firebase'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from "redux";
import { connect } from "react-redux";
import TrailView from './TrailView'

class TrailRetriever extends Component {
  state = {
    trail: [],
    user: ''
  }
  static getDerivedStateFromProps(props, state) {
    const { auth } = props;
    const user = auth.uid
    return {user: user}
  }

  componentDidMount () {
    const { lat, lng } = this.props
   
    axios
      .get(
        `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&maxDistance=100&maxResults=200&key=200339330-556c3c08bab51add2eafd094be79c93f`
      )
      .then(res => {
        console.log('res', res)

        if (res.data.trails.length === 0) {
          this.props.handler()
          return
        }

        const random = Math.floor(Math.random() * 200)
        const trails = res.data.trails.map(el => {
          el.trailID = el.id
          delete el.id
          el.hikedStatus = false
          return el
        })

        this.setState(...this.state, {trail: trails[random]})

      })
      .catch(err => {
        console.log('err', err)
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
    console.log(this.state)
    return (
      <div className='card'>
        <h3 className='card-header'>
          Your Trail
        </h3>
        <TrailView trailDetails={this.state.trail} />
        <button onClick={this.onClick}>Save Trail</button>
      </div>
    )
  }
}
export default compose(
  firebaseConnect(),
  firestoreConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(TrailRetriever);
