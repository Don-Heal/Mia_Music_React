import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";
import { signUp } from "../services/authServices";
import image from "../assets/mv2.gif";

const SignUpForm = () => {
  const { dispatch } = useGlobalState(); //stores the global state of the application
  const navigate = useNavigate(); //used to navigate to another page

  const initialFormData = {
    //initial form data
    username: "", //stores the username
    email: "", //stores the email
    password: "", //stores the password
    password_confirmation: "", //stores the password confirmation
  };

  const [formData, setFormData] = useState(initialFormData); //stores the form data
  const [error, setError] = useState(null); //stores the error

  const handleSubmit = (e) => {
    //handles the submit event
    e.preventDefault(); //prevents the default behavior of the form

    signUp(formData) //signs up the user
      .then((user) => {
        //if there is no error
        let errorMessage = ""; //stores the error message
        if (user.error) {
          //if there is an error
          Object.keys(user.error).forEach((key) => {
            //for each key in the error object
            errorMessage = errorMessage.concat(
              "",
              `${key} $    {user.error[key]}`,
            ); //concatenates the error message
          });
          setError(errorMessage); //sets the error
        } else {
          sessionStorage.setItem("username", user.username); //sets the username in the session storage
          sessionStorage.setItem("token", user.jwt); //sets the token in the session storage
          dispatch({
            type: "setLoggedInUser", //sets the logged in user
            data: user.username, //sets the logged in user
          });
          dispatch({
            type: "setToken", //sets the token
            data: user.jwt, //sets the token
          });
          setFormData(initialFormData); //sets the form data to the initial form data
          navigate("/bookings"); //navigates to the bookings page
        }
      })
      .catch((e) => {
        //if there is an error
        console.log(e); //logs the error
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
      <h1 class="title">Sign up</h1>
      {error && <p>{error}</p>}
      <div class="image">
        <img src={image} alt="music" />
      </div>
      <div class="info-head">
        <br></br>
        <br></br>
        <br></br>
      </div>
      <div class="info">
        <div class="center">
          <form class="form" onSubmit={handleSubmit}>
            <div>
              <label>Username: </label>
              <br></br>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleFormData}
              />
            </div>
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
            <div>
              <label htmlFor="password">Password confirmation: </label>
              <br></br>
              <input
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleFormData}
              />
            </div>
            <div class="center">
              <buton class="button">
                <input class="button" type="submit" value="Sign up" />
              </buton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
