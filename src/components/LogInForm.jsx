import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";
import { logIn } from "../services/authServices";
import image from "../assets/mv2.gif";

const LogInForm = () => {
  //this component is used to log in a user
  const { dispatch } = useGlobalState(); //stores the global state of the application
  const navigate = useNavigate(); //used to navigate to another page

  const initialFormData = {
    //initial form data
    email: "", //stores the email
    password: "", //stores the email and password
  };

  const [formData, setFormData] = useState(initialFormData); //stores the form data
  const [error, setError] = useState(null); //stores the error

  const handleSubmit = (e) => {
    //handles the submit event
    e.preventDefault(); //prevents the default behavior of the form

    logIn(formData).then((user) => {
      //logs in the user
      if (user.error) {
        //if there is an error
        console.log("user.error", user.error); //logs the error
        setError(user.error); //sets the error
      } else {
        //if there is no error
        setError(null); //sets the error to null
        sessionStorage.setItem("username", user.username); //sets the username in the session storage
        sessionStorage.setItem("token", user.jwt); //sets the token in the session storage
        sessionStorage.setItem("is_admin", user.is_admin); //sets the is_admin in the session storage
        dispatch({
          //dispatches the global state
          type: "setLoggedInUser", //sets the logged in user
          data: user.username, //sets the logged in user
          data2: user.is_admin, //sets the logged in user
        });
        dispatch({
          //dispatches the global state
          type: "setToken", //sets the token
          data: user.jwt, //sets the token
        });
        setFormData(initialFormData); //sets the form data to the initial form data
        navigate("/bookings"); //navigates to the bookings page
      }
    });
  };
  const handleFormData = (e) => {
    //handles the form data
    setFormData({
      ...formData, //sets the form data
      [e.target.id]: e.target.value, //sets the form data
    });
  };
  return (
    <>
      <h1 class="title">Log in</h1>
      {error && <p>{error}</p>}{" "}
      <div class="image">
        <img src={image} alt="music" />
      </div>
      <div class="info-head">
        <div class="form-style-5">
          <br></br>
          <br></br>
          <br></br>
        </div>
        <div class="info">
          <div class="center">
            <form onSubmit={handleSubmit}>
              <div>
                <label>Email: </label>
                <br></br>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleFormData}
                />
              </div>
              <div>
                <label htmlFor="password">Password: </label>
                <br></br>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleFormData}
                />
              </div>
              <div class="center">
                <buton class="button">
                  <input class="button" type="submit" value="Log In" />
                </buton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogInForm;
