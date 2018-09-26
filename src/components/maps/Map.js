import React from 'react'
import { compose, withProps } from 'recompose'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { Link } from 'react-router-dom'

const MyMapComponent = compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={8} defaultCenter={props.defaultCenter}>
    {props.isMarkerShown &&
      <Marker
        position={props.defaultCenter}
        ref={props.onMarkerMounted}
        onDragEnd={props.onDragEnd}
        draggable
      />}

  </GoogleMap>
))

class MyFancyComponent extends React.PureComponent {
  // @todo --> add lat/lng to redux state to remove conditionals
  state = {
    isMarkerShown: false,
    updLat: 0,
    updLng: 0
  }

  componentWillMount () {
    const refs = {}

    this.setState({
      onMarkerMounted: ref => {
        refs.marker = ref
      },

      onDragEnd: () => {
        const position = refs.marker.getPosition()
        const updLat = parseFloat(position.lat())
        const updLng = parseFloat(position.lng())

        this.setState({ updLat: updLat, updLng: updLng })
        console.log(this.state)
      }
    })
  }

  componentDidMount () {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  render () {
    const {
      isMarkerShown,
      onDragEnd,
      onMarkerMounted,
      updLat,
      updLng
    } = this.state

    const { lat, lng } = this.props.currentLocation

    return (
      <div>
        <div>
          <h1>Your Location:</h1>
          {updLat && updLng
            ? <h3>{updLat}, {updLng}</h3>
            : <h3>{lat}, {lng}</h3>}
        </div>

        <div>
          {updLat && updLng
            ? <Link
              to={`/returntrail/${updLat}/${updLng}`}
              className='btn btn-dark'
              >
              {' '}Find Trail
              </Link>
            : <Link to={`/returntrail/${lat}/${lng}`} className='btn btn-dark'>
              {' '}Find Trail
              </Link>}

        </div>

        <MyMapComponent
          isMarkerShown={isMarkerShown}
          onDragEnd={onDragEnd}
          onMarkerMounted={onMarkerMounted}
          defaultCenter={
            updLat && updLng
              ? { lat: updLat, lng: updLng }
              : { lat: lat, lng: lng }
          }
        />
      </div>
    )
  }
}
export default MyFancyComponent
