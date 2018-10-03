import React from "react";
import TrailRetriever from "../trails/TrailRetriever";

import styles from "../../styles/text.css";

// Renders TrailRetriever which will display TrailView

class TrailFinder extends React.Component {
  constructor() {
    super();

    this.state = {
      isTrailFound: true
    };

    this.noRouteHandler = this.noRouteHandler.bind(this);
  }

  noRouteHandler() {
    this.setState({
      isTrailFound: false
    });
  }

  renredNotFound() {
    return <h1>Nothing found, try again</h1>;
  }

  render() {
    const { lat, lng } = this.props.match.params;

    if (this.state.isTrailFound) {
      return (
        <div>
          <div className={styles.titles}>
            <h1>Found One! </h1>
            <p className="lead">Near this location: </p>
            <p className="text-secondary">
              <span className={styles.heavyblue}>Lat:</span> {lat}{" "}
              <span className={styles.heavyblue}> Lon:</span> {lng}
            </p>
          </div>
          <div className="container" styles={{ backgroundColor: "white" }}>
            <TrailRetriever lat={lat} lng={lng} handler={this.noRouteHandler} />
          </div>
        </div>
      );
    }

    return this.renredNotFound();
  }
}

export default TrailFinder;
