import React from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";

const Navigation = () => {
  const { store, dispatch } = useGlobalState(); //stores the global state of the application
  const { loggedInUser } = store; //stores the logged in user

  const handleLogout = () => {
    //logs the user out
    sessionStorage.removeItem("username"); //removes the username from session storage
    sessionStorage.removeItem("token"); //removes the token from session storage
    sessionStorage.removeItem("is_admin"); //removes the admin status from session storage
    dispatch({
      type: "setLoggedInUser", //dispatches the global state
      data: null, //dispatches the global state
    });
    dispatch({
      type: "setToken", //dispatches the global state
      data: null, //dispatches the global state
    });
    dispatch({
      type: "setIsAdmin", //dispatches the global state
      data: null, //dispatches the global state
    });
    alert(" You have logged out successfully"); //alerts the user that they have logged out successfully
    window.location.href = "/"; //redirects the user to the home page
  };

  return (
    <>
      <input type="checkbox" id="hamburger-input" class="burger-shower" />
      <label id="hamburger-menu" for="hamburger-input">
        <nav id="sidebar-menu">
          <h3>Menu</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/bookings">Bookings</Link>
            </li>
            <li>
              <Link to="/prices">Prices</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>{!loggedInUser && <Link to="/login">Login</Link>}</li>
            <li>{!loggedInUser && <Link to="/signup">Sign Up</Link>}</li>
            <li>{loggedInUser && <Link to="/accounts">Account</Link>}</li>
            <li>
              {loggedInUser && (
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </label>

      <div class="overlay"></div>
      <nav class="nav">
        <Link to="/">Home</Link>
        <Link to="/bookings">Bookings</Link>
        <Link to="/prices">Prices</Link>
        <Link to="/contact">Contact</Link>
        {!loggedInUser && <Link to="/login">Login</Link>}
        {!loggedInUser && <Link to="/signup">Sign Up</Link>}
        {loggedInUser && <Link to="/accounts">Account</Link>}
        {loggedInUser && (
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        )}
      </nav>
    </>
  );
};

export default Navigation;
