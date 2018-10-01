import React from "react";
// import classnames from "classnames";
import PropTypes from "prop-types";
import styles from "../../styles/alert.css";

// functional components can take in props
// get messageType from props when wanting to add more notifications

const Alert = props => {
  const { message } = props;
  return <p className={styles.display}>{message}</p>;
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired
};
export default Alert;
