import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Nav from "./Components/Nav/Nav";
import Home from "./pages/Home";
import TodoListPage from "./pages/TodoListPage";
import ProtectedRoute from "./ProtectedRoute";
import Cookies from "universal-cookie";

class App extends Component {
  state = { isAuthenticated: false, username: "" };
  cookie = new Cookies();

  authHandler = () => {
    this.setState({ isAuthenticated: true });
  };
  logoutHandler = () => {
    this.setState({ isAuthenticated: false });
    this.cookie.remove("token");
  };
  componentDidMount = () => {
    const authCookie = this.cookie.get("token");
    authCookie ? this.authHandler() : this.logoutHandler();
    // authCookie ? console.log("isAuth") : console.log("no Auth");
  };
  setUsername = term => {
    this.setState({ username: term });
  };
  render() {
    return (
      <div>
        <Nav
          username={this.state.username}
          logoutHandler={this.logoutHandler}
          isAuthenticated={this.state.isAuthenticated}
        />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/auth">
            <AuthPage
              isAuthenticated={this.state.isAuthenticated}
              authHandler={this.authHandler}
            />
          </Route>
          <ProtectedRoute auth={this.state.isAuthenticated} path="/todolist">
            <TodoListPage setUsername={this.setUsername} />
          </ProtectedRoute>
        </Switch>
      </div>
    );
  }
}
export default App;
