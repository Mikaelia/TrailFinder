import React, { Component } from 'react'
import MyFancyComponent from './Map'

class MapView extends Component {
  constructor (props) {
    super(props)
    // Default lat/lng set in component
    this.state = {
      currentLatLng: {
        lat: 0,
        lng: 0
      },
      isMarkerShown: false
    }
  }

  componentDidMount () {
    this.getGeoLocation()
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.state.isMarkerShown !== nextState.isMarkerShown) return true
    return false
  }
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
      ? <div>
        <MyFancyComponent currentLocation={this.state.currentLatLng} />
      </div>
      : false
    return map
  }
}

export default MapView
