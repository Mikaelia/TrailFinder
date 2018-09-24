import React, { Component } from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps'
import Map from './Map'

class MapView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentLatLng: {
        lat: 0,
        lng: 0
      },
      isMarkerShown: false
    }

    // console.log('this.props:', this.props)
  }

  componentWillUpdate () {
    console.log('componentWillUpdate')
    // this.getGeoLocation()
  }

  componentDidMount () {
    this.getGeoLocation()
    // this.delayedShowMarker()
  }

  shouldComponentUpdate (nextProps, nextState) {
    console.log('shouldComponentUpdate')
    console.log(this.state.isMarkerShown)
    console.log(nextState.isMarkerShown)
    if (this.state.isMarkerShown !== nextState.isMarkerShown) return true

    return false
  }

  // delayedShowMarker = () => {
  // this.getGeoLocation()
  // this.setState({ isMarkerShown: true })
  // }

  // handleMarkerClick = () => {
  //   this.setState({ isMarkerShown: false })
  //   this.delayedShowMarker()
  // }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        // console.log(position.coords)
        this.setState(prevState => ({
          isMarkerShown: true,
          currentLatLng: {
            ...prevState.currentLatLng,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }))
      })
    } else {
      error => console.log(error)
    }
  }

  render () {
    const map = this.state.isMarkerShown
      ? <Map currentLocation={this.state.currentLatLng} />
      : false

    console.log(map)
    return map
  }
}

export default MapView
