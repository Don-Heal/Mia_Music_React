import React, { useState } from "react";
import axios from "axios";
import image from "../assets/mv2.gif";

const Contact = () => {
  const [serverState, setServerState] = useState({
    //sets the state of the server
    submitting: false, //submitting is a boolean that determines if the form is submitting
    status: null, //status is a string that determines the status of the form
  });
  const handleServerResponse = (ok, msg, form) => {
    //handles the server response
    setServerState({
      //sets the state of the server
      submitting: false, //submitting is a boolean that determines if the form is submitting
      status: { ok, msg }, //status is a string that determines the status of the form
    });
    if (ok) {
      //if the server response is ok
      form.reset(); //resets the form
    }
  };
  const handleOnSubmit = (e) => {
    //handles the submit of the form
    e.preventDefault(); //prevents the default behaviour of the form
    const form = e.target; //stores the form
    setServerState({ submitting: true }); //sets the state of the server
    axios({
      //sends the form data to the server
      method: "post", //sends the form data to the server
      url: "https://formspree.io/f/xbjbravy", //sends the form data to the server
      data: new FormData(form), //sends the form data to the server
    })
      .then((r) => {
        handleServerResponse(true, "Thank you for your message!", form); //handles the server response
      })
      .catch((r) => {
        handleServerResponse(false, r.response.data.error, form); //handles the server response
      });
  };
  return (
    <>
      <h1 class="title">Contact Mia</h1>
      <div class="image">
        <img src={image} alt="music" />
      </div>
      <h2 class="info-head">Please Submit A Form</h2>{" "}
      <div class="info">
        <form class="form" onSubmit={handleOnSubmit}>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" name="email" required />
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="10"></textarea>
          <button
            class="button"
            type="submit"
            disabled={serverState.submitting}
          >
            <p class="links">Submit</p>
          </button>
          {serverState.status && (
            <p className={!serverState.status.ok ? "errorMsg" : ""}>
              {serverState.status.msg}
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default Contact;
