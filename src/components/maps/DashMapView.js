import React, { Component } from "react";
import MyFancyComponent from "./DashMap";

class DashMapView extends Component {
  constructor(props) {
    super(props);
    // Default lat/lng set in component
    this.state = {
      currentLatLng: {
        lat: 0,
        lng: 0
      },
      isMarkerShown: false,
      showMap: true
    };
  }

  componentDidMount() {
    this.setState({
      currentLatlng: {
        lat: this.props.lat,
        lng: this.props.lng
      }
    });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.isMarkerShown !== nextState.isMarkerShown) return true;
  //   return false;
  // }

  //   getGeoLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(position => {
  //         // display component if geolocation
  //         this.setState(prevState => ({
  //           isMarkerShown: true,
  //           currentLatLng: {
  //             ...prevState.currentLatLng,
  //             lat: position.coords.latitude,
  //             lng: position.coords.longitude
  //           }
  //         }));
  //       });
  //     } else {
  //       error => console.log(error);
  //     }
  //   };

  render() {
    console.log("render!!!");

    //set map component.
    return (
      <div className="container" styles={{ height: `100%` }}>
        <MyFancyComponent currentLocation={this.state.currentLatLng} />
      </div>
    );
  }
}

export default DashMapView;
