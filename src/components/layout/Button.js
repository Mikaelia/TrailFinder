import React from "react";
import styles from "../../styles/trailview.css";
export default props => {
  return (
    <button
      className={styles.formbuttons}
      onClick={props.onClick}
      style={props.style ? props.style : null}
    >
      {props.message}

      {props.children}
    </button>
  );
};
