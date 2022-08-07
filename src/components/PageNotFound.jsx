import React from "react";
import { Link } from "react-router-dom";
import image from "../assets/mv2.gif";

const PageNotFound = () => {
  //this is the component that is rendered if the user tries to access a page that doesn't exist
  return (
    <>
      <p class="text">404 Error - Page not found</p>
      <div class="image">
        <img src={image} alt="music" />
      </div>
      <Link to="/" class="text">
        Back to home
      </Link>
    </>
  );
};

export default PageNotFound;
