import React, { Component } from "react";

import styles from "../../styles/weather.css";

export default class Weather extends Component {
  state = {
    condition: "",
    temp: "",
    wind: "",
    location: ""
  };

  componentWillMount() {
    console.log(this.props);
    if (this.props.lat) this.getWeather(this.props.lat, this.props.lng);
  }

  // shouldComponentUpdate(newS, newP) {
  //   if (this.props.lat || this.props.lng) return false;

  //   return true;
  // }

  getWeather = async (lat, lng) => {
    const baseUrl = "https://cors-anywhere.herokuapp.com/";
    const request = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=e7f2e556beea19dabb40f499f8e0dc30&units=imperial`;

    const api_call = await fetch(baseUrl + request);

    const response = await api_call.json();

    if (!(Object.keys(response).length === 0)) {
      console.log(response.weather[0].main);

      this.setState({
        condition: response.weather[0].main,
        temp: response.main.temp,
        wind: response.wind.speed,
        location: response.name
      });
    }
  };

  render() {
    const { condition, temp, wind, location } = this.state;
    return (
      <div className={styles.sitemessage}>
        Current conditions in <i class="fas fa-long-arrow-alt-right" />
        <strong style={{ fontWeight: "600", color: "#3a4d85" }}>
          {location}
          <i class="fas fa-long-arrow-alt-right" />
        </strong>{" "}
        Weather:
        {"  "}
        <span style={{ color: "rgb(69, 130, 209)", fontWeight: "600" }}>
          {condition}
          {"  "}
        </span>
        Temperature:
        {"  "}
        <span style={{ color: "rgb(69, 130, 209)", fontWeight: "600" }}>
          {"  "}
          {temp}
        </span>
        {"  "}
        The wind's blowing at:{" "}
        <span style={{ color: "rgb(69, 130, 209)", fontWeight: "600" }}>
          {" "}
          {wind}
          {"  "}
        </span>
        mph
      </div>
    );
  }
}
