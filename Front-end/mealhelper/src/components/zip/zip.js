import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/userActions";
import { withRouter, Link } from "react-router-dom";
import { Alert } from "reactstrap";
import Sign from "../Sign";
// import Loading from "../signup/Double Ring-2s-200px.svg";
import "../signup/signup.css";
import "./zip.css";
import Applelogo from "../../img/appstorebadge.png";
import QMark from "../../img/questionmark.png";

class Zip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoading: false,
      visable: false,
      visableError: false
    };
    // this.confirmLogin = this.confirmLogin.bind(this);
  }
  componentDidMount = () => {
    if (localStorage.getItem("token")) {
      this.props.history.push("/zip");
    }
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  toggleVisability = () => {
    this.setState({ visableError: false, visable: false });
  };
  //   loggin = event => {
  //     if (!localStorage.getItem("token")) {
  //       this.setState({ isLoading: false, visableError: true });
  //       setTimeout(this.toggleVisability, 3000);
  //     } else {
  //       this.props.history.push("/zip");
  //     }
  //   };
  //   async confirmLogin() {
  //     this.setState({ isLoading: true });
  //     const confirmed = await this.createUser();
  //     setTimeout(this.loggin, 7000);
  //   }
  //////Needs to add zip code into user table//////
  createUser = event => {
    if (!this.state.email || !this.state.password) {
      this.setState({ visable: true });
      setTimeout(this.toggleVisability, 3000);
    } else {
      const { email, password } = this.state;
      const user = { email, password };
      this.props.loginUser(user);
    }
  };

  render() {
    console.log(localStorage.getItem("token"));
    return (
      <div className="main-container">
        {/* {this.state.isLoading ? (
          <div className="isLoading">
            <img className="loading" src={Loading} alt="Loading icon" />
          </div>
        ) : ( */}
        <div>
          <div className="alert-box3">
            <Alert isOpen={this.state.visableError} color="danger">
              Invalid Zip Code. Please Try Again.
            </Alert>
          </div>
          <div className="formcenter">
            <div className="user-form-container-zip">
              <h1 className="signup-title">EatWell</h1>
              <form className="signup-form">
                <div className="form-group">
                  <label>
                    Zip Code
                    <div id="wrapper">
                      <img
                        className="qmark"
                        src={QMark}
                        alt="Why my zip code?"
                      />
                      <p class="text">
                        We use your zip code to add weather data to your fact
                        set.
                        <hr />
                        This can be an important data point as you understand
                        how your meal intake affects your health!
                      </p>
                    </div>
                  </label>
                  <input
                    className="email-input"
                    type="email"
                    name="email"
                    value={this.state.zip}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <Link to="/signup">
                  <p> ⬅ Return to Sign Up </p>
                </Link>
                <Link to="/login">
                  <p> ⬅ Return to Login </p>
                </Link>
                <div className="signupzip" onClick={this.confirmLogin}>
                  <span> Continue Log In</span>
                </div>
              </form>
              <div className="authbuttonlogin">
                <Sign />
              </div>
              <a href="https://www.apple.com/ios/app-store/">
                <img
                  className="applebadge"
                  src={Applelogo}
                  alt="Apple App Store"
                />
              </a>
            </div>
          </div>
        </div>
        // )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Zip));
