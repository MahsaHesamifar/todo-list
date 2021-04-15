import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import Url from "../../Urls/Urls";

const Auth = props => {
  //states:
  const [loginFormShow, setLoginFormShow] = useState(true);

  const cookie = new Cookies();

  // event handlers:
  const loginHandler = async e => {
    e.preventDefault();
    const loginData = {
      username: e.target[0].value,
      password: e.target[1].value,
    };
    try {
      const response = await axios.post(`${Url}/users/login`, loginData);
      console.log(response);
      cookie.set("token", response.data.token);
      props.authHandler();
    } catch (error) {
      return alert(error.response.data.message);
    }
  };
  const signupHandler = async e => {
    e.preventDefault();
    const signupData = {
      username: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    };
    try {
      const response = await axios.post(`${Url}/users/signup/`, signupData);
      console.log(response);
      cookie.set("token", response.data.token);
      props.authHandler();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  if (props.isAuthenticated) {
    return <Redirect to="/todolist" />;
  }
  return (
    <div className="auth-container">
      <div className="box">
        {/* <header className="auth-header">Login or Sign Up</header> */}
        <div className="toggle">
          <h1
            className={loginFormShow ? "active" : ""}
            onClick={() => {
              setLoginFormShow(true);
            }}
          >
            Login
          </h1>
          <h1
            className={!loginFormShow ? "active" : ""}
            onClick={() => {
              setLoginFormShow(false);
            }}
          >
            SignUp
          </h1>
        </div>

        {loginFormShow ? (
          <form onSubmit={loginHandler} className="login-form">
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <button>Log in</button>
          </form>
        ) : (
          <form onSubmit={signupHandler} className="signup-form">
            <input type="text" placeholder="username" />
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <button>Sign Up</button>
          </form>
        )}
      </div>
    </div>
  );
};
export default Auth;
