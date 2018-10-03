import styles from "../../styles/mapview.css";
import Mapview from "../maps/MapView";
import classnames from "classnames";
import React, { Component } from "react";

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
  }

  click() {
    this.setState({ active: true });
  }

  render() {
    return (
      <div>
        <div className={styles.collapseDiv}>
          <h1 className={styles.header}>
            {" "}
            Let's Begin{" "}
            <span className={styles.arrow1}>
              <i className="fas fa-angle-right" />
            </span>
            <span className={styles.arrow2}>
              <i className="fas fa-angle-right" />
            </span>
          </h1>
        </div>
        <div
          onClick={this.click.bind(this)}
          className={classnames({
            [styles.showDiv]: this.state.active,
            [styles.sideDiv]: !this.state.active
          })}
        >
          <Mapview />
        </div>
      </div>
    );
  }
}
