import React from 'react'
import TrailRetriever from '../trails/TrailRetriever'

class TrailFiner extends React.Component {
  constructor () {
    super()

    this.state = {
      isTrailFound: true
    }

    this.noRouteHandler = this.noRouteHandler.bind(this)
  }

  noRouteHandler () {
    this.setState({
      isTrailFound: false
    })
  }

  renredNotFound () {
    return <h1>Nothing found, try again</h1>
  }

  render () {
    const { lat, lng } = this.props.match.params

    if (this.state.isTrailFound) {
      return (
        <div>
          <h1 className='display-4'>Found One! </h1>
          <p className='lead'>At this location: </p>
          <p className='text-secondary'>Lat: {lat} Lon: {lng}</p>
          <TrailRetriever lat={lat} lng={lng} handler={this.noRouteHandler} />
        </div>
      )
    }

    return this.renredNotFound()
  }
}

export default TrailFiner
