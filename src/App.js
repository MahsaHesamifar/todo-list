import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Nav from "./Components/Nav/Nav";
import Home from "./pages/Home";
import TodoListPage from "./pages/TodoListPage";
import ProtectedRoute from "./ProtectedRoute";
import Cookies from "universal-cookie";

const App = () => {
  //states:
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  //
  const cookie = new Cookies();

  //componentDidMount -> useEffect:
  useEffect(() => {
    const authCookie = cookie.get("token");
    authCookie ? authHandler() : logoutHandler();
  }, []);

  const authHandler = () => {
    setIsAuthenticated(true);
  };
  const logoutHandler = () => {
    setIsAuthenticated(false);
    cookie.remove("token");
  };

  return (
    <div>
      <Nav
        username={username}
        logoutHandler={logoutHandler}
        isAuthenticated={isAuthenticated}
      />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/auth">
          <AuthPage
            isAuthenticated={isAuthenticated}
            authHandler={authHandler}
          />
        </Route>
        <ProtectedRoute auth={isAuthenticated} path="/todolist">
          <TodoListPage setUsername={setUsername} />
        </ProtectedRoute>
      </Switch>
    </div>
  );
};

export default App;
