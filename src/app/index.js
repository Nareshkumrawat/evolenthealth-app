import React, { Component } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { BrowserRouter as Router } from "react-router-dom";
import "../web/styles/fonts.css";
import "../web/styles/animate.css";
import "../web/styles/app.css";
import "../web/styles/appmobile.css";
import Routes from "../web/routes";
import "../web/styles/responsive.css";
import $ from "jquery";

/**
 * Application entry point.
 * Maps provider, store, routes
 *
 * We are using browser router, if hashRouting is preferred then this is where you change.
 */
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Routes />
        </Router>
      </Provider>
    );
  }
}

export default App;
