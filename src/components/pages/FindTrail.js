import React from 'react'
import GetTrail from '../trails/GetTrail'

export default props => {
  const { lat, lng } = props.match.params

  return (
    <div>
      <h1 className='display-4'>Found One! </h1>
      <p className='lead'>At this location: </p>
      <p className='text-secondary'>Lat: {lat} Lon: {lng}</p>
      <GetTrail lat={lat} lng={lng} />

    </div>
  )
}
