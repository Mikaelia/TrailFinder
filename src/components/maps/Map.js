import React from 'react'
import { compose, withProps } from 'recompose'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

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
  state = {
    isMarkerShown: false,
    lat: 0,
    lng: 0
  }

  componentWillMount () {
    const refs = {}

    this.setState({
      onMarkerMounted: ref => {
        refs.marker = ref
      },

      onDragEnd: () => {
        const position = refs.marker.getPosition()
        const lat = parseFloat(position.lat())
        const lng = parseFloat(position.lng())

        this.setState({ lat: lat, lng: lng })
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
    const { isMarkerShown, onDragEnd, onMarkerMounted } = this.state

    const { lat, lng } = this.props.currentLocation

    return (
      <MyMapComponent
        isMarkerShown={isMarkerShown}
        onDragEnd={onDragEnd}
        onMarkerMounted={onMarkerMounted}
        defaultCenter={{ lat: lat, lng: lng }}
      />
    )
  }
}
export default MyFancyComponent
