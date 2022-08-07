import React, { useState, useEffect } from "react";
import { useGlobalState } from "../utils/stateContext";
import { createBooking } from "../services/bookingsServices";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import image from "../assets/mv2.gif";

const BookingForm = () => {  
  const { store, dispatch } = useGlobalState(); //stores the global state of the application
  const navigate = useNavigate(); //navigates to the next page
  const { loggedInUser } = store; //stores the logged in user
  const initialFormData = { //initial form data for the booking form
    username: `${loggedInUser}`,
    time: "",
    date: "",
    location: "",
    instrument: "",
  };

  const [formData, setFormData] = useState(initialFormData); //stores the form data
  const [selectedOption, setSelectedOption] = useState(null); //stores the selected option
  const [startDate, setStartDate] = useState(null); //stores the start date
  const [bookings, setBookings] = useState([]); //stores the bookings
  const fetchData = async () => {  //fetches the bookings from the database
    const response = await fetch( 
      "https://mia-music-studios-api.herokuapp.com/bookings", 
    );
    const data = await response.json(); //stores the bookings in the data variable
    setBookings(data); //sets the bookings
  };

  const timeOptions = [ //options for the time dropdown
    { value: "09:00", label: "9:00 am" }, 
    { value: "10:00", label: "10:00 am" },
    { value: "11:00", label: "11:00 am" },
    { value: "12:00", label: "12:00 pm" },
    { value: "13:00", label: "1:00 pm" },
    { value: "14:00", label: "2:00 pm" },
    { value: "15:00", label: "3:00 pm" },
    { value: "16:00", label: "4:00 pm" },
    { value: "17:00", label: "5:00 pm" },
  ];

  const bookingTimes = bookings.filter((booking) => { //filters the bookings to only show the times that are available
    return booking.date === formData.date; //returns the bookings that match the date
  });

  const Times = bookingTimes.map((booking) => { //maps the bookings to the times that are available
    return booking.time;  //returns the times that are available
  });
  const timesOptionsfiltered = timeOptions.filter((time) => { //filters the time options to only show the times that are available
    return !Times.includes(time.value); //returns the time options that are available
  });

  const isWeekday = (date) => { //checks if the date is a weekday
    const day = date.getDay(date); //gets the day of the date
    return day !== 0 && day !== 6; //returns true if the date is not a weekday
  };

  useEffect(() => { //fetches the bookings when the component mounts
    fetchData(); //fetches the bookings
  }, []); //empty array as the component only mounts once

  const handleSubmit = (e) => { //handles the submit of the form
    e.preventDefault(); //prevents the default behaviour of the form
    if ( 
      formData.username === "" || //checks if the username is empty
      formData.time === "" || //checks if the time is empty
      formData.date === "" || //checks if the date is empty
      formData.location === "" || //checks if the location is empty
      formData.instrument === "" 
    ) {
      alert(  //alerts the user that the form is incomplete
        "One or more fields left blank. Please complete all fields to make booking.",
      );
    } else {
      addBooking(formData); //adds the booking to the database
      navigate("/");  //navigates to the home page
      window.location.reload(); //reloads the page
      alert("Booking created successfully");  //alerts the user that the booking was created successfully
    }
  };

  const handleFormData = (e) => { //handles the form data
    setFormData({   
      ...formData,  //sets the form data
      [e.target.id]: e.target.value,  //sets the form data based on the id of the input
    });
  };

  const addBooking = (data) => {  //adds the booking to the database
    createBooking(data).then((booking) => { //creates the booking in the database
      dispatch({  //dispatches the booking to the global state
        type: "addBooking", //sets the type of the dispatch to addBooking
        data: booking,  //sets the data of the dispatch to the booking
      });
    });
  };

  return (
    <>
      <div className="About">
        <h1 class="title">Booking Form</h1>
      </div>
      <div class="image">
        <img src={image} alt="music" />
      </div>
      <div class="form-style-5">
        <>
          <p class="info">{`This booking is for ${loggedInUser}`}</p>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="hidden"
                name="username"
                id="username"
                value={loggedInUser}
                onChange={handleFormData}
                placeholder="Choose a time"
              />
            </div>
            <div>
              <label htmlFor="date">Date:</label>
              <DatePicker
                id="date"
                selected={startDate}
                placeholderText="Select a weekday"
                onChange={(date) => {
                  setStartDate(date);
                  setFormData({
                    ...formData,
                    date: date.toString().slice(0, 15),
                  });
                }}
                filterDate={(date) => isWeekday(date)}
              />
            </div>
            <div>
              <br></br>
              <label htmlFor="time">Time:</label>
              <Select
                isDisabled={true && !startDate}
                defultValue={selectedOption}
                options={timesOptionsfiltered}
                placeholder="Choose a time"
                onChange={(selectedOption) => {
                  setSelectedOption(selectedOption);
                  setFormData({
                    ...formData,
                    time: selectedOption.value,
                  });
                }}
              />
            </div>
            <div>
              <br></br>
              <label>Location:</label>
              <label htmlFor="location">
                <input
                  type="radio"
                  name="location"
                  id="location"
                  value="Studio"
                  onChange={handleFormData}
                />
                Studio
              </label>
              <label htmlFor="location">
                <input
                  type="radio"
                  name="location"
                  id="location"
                  value="Online"
                  onChange={handleFormData}
                />
                Online
              </label>
            </div>
            <div>
              <br></br>
              <label>Instrument:</label>
              <label htmlFor="instrument">
                <input
                  type="radio"
                  name="instrument"
                  id="instrument"
                  value="Guitar"
                  onChange={handleFormData}
                />
                Guitar
              </label>
              <label htmlFor="instrument">
                <input
                  type="radio"
                  name="instrument"
                  id="instrument"
                  value="Piano"
                  onChange={handleFormData}
                />
                Piano
              </label>
              <label htmlFor="instrument">
                <input
                  type="radio"
                  name="instrument"
                  id="instrument"
                  value="Voice"
                  onChange={handleFormData}
                />
                Voice
              </label>
            </div>
            <button class="button">
              <input type="submit" value="Make booking" />
            </button>
          </form>
        </>
      </div>
    </>
  );
};

export default BookingForm;
