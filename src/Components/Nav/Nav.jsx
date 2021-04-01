import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
const Nav = ({ isAuthenticated, logoutHandler, username }) => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link onClick={logoutHandler} to="/auth">
                Log out
              </Link>
            </li>

            <li>
              <Link to="/todolist">Todolist</Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/auth">Login / Sign Up</Link>
          </li>
        )}
      </ul>
      {isAuthenticated ? (
        <p className="welcome">
          Hello <span className="username">{username}</span>
        </p>
      ) : null}
    </nav>
  );
};
export default Nav;
