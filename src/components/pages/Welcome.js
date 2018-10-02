import styles from "../../styles/mapview.css";
import Mapview from "../maps/MapView";
import React from "react";

export default () => {
  return (
    <div>
      <div className={styles.collapseDiv}>
        <h1 className={styles.header}>
          {" "}
          Let's Begin{" "}
          <span className={styles.arrow1}>
            <i class="fas fa-angle-right" />
          </span>
          <span className={styles.arrow2}>
            <i class="fas fa-angle-right" />
          </span>
        </h1>
      </div>
      <div className={styles.sideDiv}>
        <Mapview />
      </div>
    </div>
  );
};
