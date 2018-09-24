import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { Link } from 'react-router-dom'

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
        {lat && lng
          ? <div>
            <h1>Your Location:</h1>
            <h3>{lat}, {lng}</h3>
          </div>
          : null}
        <div>
          <GoogleMapExample
            containerElement={
              <div style={{ height: `500px`, width: '500px' }} />
            }
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
        <div>
          <button onClick={this.onDeleteClick} className='btn btn-danger'>
            Delete
          </button>
          <Link to={`/returntrail/${lat}/${lng}`} className='btn btn-dark'>
            Find Trail
          </Link>
        </div>
      </div>
    )
  }
}
export default Map
