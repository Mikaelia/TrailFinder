import React from "react";
import Alert from "../layout/Alert";

export default props => {
  return props.message ? <Alert message={props.message} /> : false;
};
