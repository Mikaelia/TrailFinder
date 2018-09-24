import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

class Map extends Component {
  renderMarker (lat, lng, marker) {
    console.log('renderMarker')
    if (marker) {
      return <Marker position={{ lat, lng }} />
    }

    return false
  }

  render () {
    const { lat, lng } = this.props.currentLocation
    const { isMarkerShown } = this.props
    console.log('Map props', this.props)
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 37.78202, lng: -122.40842 }}
        defaultZoom={13}
      >
        <Marker position={{ lat, lng }} />
      </GoogleMap>
    ))
    return (
      <div>
        {lat ? <h1>{lat}</h1> : null}
        <h1>Hello</h1>
        <div>
          <GoogleMapExample
            containerElement={
              <div style={{ height: `500px`, width: '500px' }} />
            }
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </div>
    )
  }
}
export default Map
