import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./Navbar.css";

class NavbarLanding extends Component {
  render() {
    return (
      <div className="Navbar-Container">
        <p className="logo">EatWell</p>
        <button className="login-navbar">Log In</button>
      </div>
    );
  }
}

export default connect()(withRouter(NavbarLanding));
