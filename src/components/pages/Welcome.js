import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="container">
      <h1>Welcome</h1>
      <Link to="/mapview" className="btn btn-dark">
        {" "}
        Let's Get Started
      </Link>
    </div>
  );
};
