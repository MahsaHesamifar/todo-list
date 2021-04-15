import React, { Component } from "react";
import axios from "axios";
import "./Auth.css";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import Url from "../../Urls/Urls";

class Auth extends Component {
  state = { loginFormShow: true };
  cookie = new Cookies();
  // event handlers:
  loginHandler = async e => {
    e.preventDefault();
    const loginData = {
      username: e.target[0].value,
      password: e.target[1].value,
    };
    try {
      const response = await axios.post(`${Url}/users/login`, loginData);
      console.log(response);
      this.cookie.set("token", response.data.token);
      this.props.authHandler();
    } catch (error) {
      return alert(error.response.data.message);
    }
  };
  signupHandler = async e => {
    e.preventDefault();
    const signupData = {
      username: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    };
    try {
      const response = await axios.post(`${Url}/users/signup/`, signupData);
      console.log(response);
      this.cookie.set("token", response.data.token);
      this.props.authHandler();
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/todolist" />;
    }
    return (
      <div className="auth-container">
        <div className="box">
          {/* <header className="auth-header">Login or Sign Up</header> */}
          <div className="toggle">
            <h1
              className={this.state.loginFormShow ? "active" : ""}
              onClick={() => {
                this.setState({ loginFormShow: true });
              }}
            >
              Login
            </h1>
            <h1
              className={!this.state.loginFormShow ? "active" : ""}
              onClick={() => {
                this.setState({ loginFormShow: false });
              }}
            >
              SignUp
            </h1>
          </div>

          {this.state.loginFormShow ? (
            <form onSubmit={this.loginHandler} className="login-form">
              <input type="text" placeholder="username" />
              <input type="password" placeholder="password" />
              <button>Log in</button>
            </form>
          ) : (
            <form onSubmit={this.signupHandler} className="signup-form">
              <input type="text" placeholder="username" />
              <input type="email" placeholder="email" />
              <input type="password" placeholder="password" />
              <button>Sign Up</button>
            </form>
          )}
        </div>
      </div>
    );
  }
}
export default Auth;
