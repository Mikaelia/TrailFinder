import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { injectGlobal } from "styled-components";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();

injectGlobal`
  /* Apply a natural box layout model to all elements, but allowing components to change */

  html {
    box-sizing: border-box;
    height: 100%
    background-color: rgb(70, 130, 208);
    background-color: aliceblue;
  }

  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    font-weight: 300;
    background-color: aliceblue;
  }

  App {
    background-color: aliceblue;
  }

`;

// Enable HMR
if (module.hot) {
  module.hot.accept();
}
