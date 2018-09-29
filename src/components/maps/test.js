import React from "react";

export default () => {
  return (
    <div>
      <div className="login-wrapper">
        <div className="login-left">
          <img src="http://res.cloudinary.com/dzqowkhxu/image/upload/v1513679279/bg-login_bxxfkf.png" />
          <div className="h1">Enter the Nebula</div>
        </div>

        <div className="login-right">
          <div className="h2">Register</div>

          <div className="form-group">
            <input type="text" id="Email" placeholder="Email" />
            <label htmlFor="Email">Email</label>
          </div>

          <div className="form-group">
            <input type="password" id="Password" placeholder="Password" />
            <label htmlFor="Password">Password</label>
          </div>

          <div className="checkbox-container">
            <input type="checkbox" />
            <div className="text-checkbox">
              I agree with the terms of service.
            </div>
          </div>

          <div className="button-area">
            <button className="btn btn-secondary">Login</button>
            <button className="btn btn-primary">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};
