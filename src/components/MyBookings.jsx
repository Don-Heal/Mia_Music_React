import React, { useEffect, useState } from "react";
import { useGlobalState } from "../utils/stateContext";
import { deleteBooking } from "../services/bookingsServices";
import { getBookings } from "../services/bookingsServices";
import image from "../assets/mv2.gif";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]); //stores the bookings
  const { store } = useGlobalState(); //stores the global state of the application
  const { loggedInUser } = store; //stores the logged in user
  let mybookings = bookings.filter((booking) => { //filters the bookings to only show the bookings of the current user
    return booking.username === loggedInUser; //returns true if the booking username matches the current user
  });
  const [user_id, setUser_id] = useState(null); //stores the user id of the current user
  const [username, setUsername] = useState(null); //stores the username of the current user
  const [id, setId] = useState(); //stores the id of the current booking
  const [date, setDate] = useState(); //stores the date of the current booking
  const [time, setTime] = useState(); //stores the time of the current booking
  const [location, setLocation] = useState(); //stores the location of the current booking
  const [instrument, setInstrument] = useState(); //stores the instrument of the current booking
  let admin = sessionStorage.getItem("is_admin"); //gets the current admin status fron session storage
  const editBooking = () => setShowResults(true); //shows the edit booking form
  const [showResults, setShowResults] = React.useState(false);  //shows the edit booking form

  if (admin === "true") {
    mybookings = bookings;  //shows all bookings if the user is an admin
  }
  const fetchData = async () => {
    getBookings().then((data) => setBookings(data));  //fetches all bookings from the database
  };

  useEffect(() => {
    fetchData();  //fetches all bookings from the database
  }, []);

  const handleDelete = async (id) => {
    // eslint-disable-next-line
    const response = await deleteBooking(id); //deletes the booking from the database
    setShowResults(false);  //hides the edit booking form
    fetchData();  //fetches all bookings from the database
  };

  useEffect(() => {
    fetchData();    //fetches all bookings from the database
  }, []);

  function selectBooking(id) {  //selects the booking to be edited
    const booking = bookings.find((booking) => booking.id === id);    //finds the booking to be edited
    setUser_id(booking.user_id);  //sets the user id of the booking to be edited
    setUsername(booking.username);    //sets the username of the booking to be edited
    setId(booking.id);  //sets the id of the booking to be edited
      setDate(booking.date);  //sets the date of the booking to be edited
      setTime(booking.time);  //sets the time of the booking to be edited
    setLocation(booking.location);  //sets the location of the booking to be edited
    setInstrument(booking.instrument);  //sets the instrument of the booking to be edited
  }

  function updateBooking() {
    let booking = { user_id, username, id, date, time, location, instrument };  //creates a booking object to be updated
    fetch(`https://mia-music-studios-api.herokuapp.com/bookings/${id}`, {
      method: "PUT",  //updates the booking in the database
      headers: {  //sets the headers of the request
        "Content-Type": "application/json", //sets the content type of the request to json
      },  
      body: JSON.stringify(booking),  //sets the body of the request to the booking object
    });
    window.location.reload(); //reloads the page
    alert("Booking updated"); //alerts the user that the booking has been updated
  }

  return (
    <>
      <div>
        <div>
          <h1 class="title">Your Bookings</h1>
        </div>
        <div class="image">
          <img src={image} alt="music" />
        </div>
        <div class="info"></div>
        {mybookings.length > 0 && (
          <table class="styled-table">
            <tr>
              <th>Student</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Instrument</th>
              <th>Operations</th>
            </tr>
            <tbody>
              {mybookings.map((booking) => (
                <tr>
                  <td>{booking.username}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>{booking.location}</td>
                  <td>{booking.instrument}</td>
                  <td>
                    <button
                      class="button"
                      onClick={() => selectBooking(booking.id, { editBooking })}
                    >
                      {showResults ? <return /> : null}
                      <p class="links">Edit</p>
                    </button>
                    <button
                      class="button"
                      onClick={() => handleDelete(booking.id)}
                    >
                      <p class="links">Delete</p>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div class="form-style-5">
          <h1>Update Booking</h1>
          <input type="hidden" value={user_id} />
          <input type="hidden" value={username} />
          <input type="hidden" value={id} />
          <input
            type="text"
            disabled={true}
            value={date}
            onChange={(e) => {}}
          />
          <br></br>
          <input
            disabled={true}
            type="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
          <br></br>
          <label>Location:</label>
          <label htmlFor="location">
            <input
              type="radio"
              name="location"
              id="location"
              checked={location === "Studio"}
              value="Studio"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
            Studio
          </label>
          <label htmlFor="location">
            <input
              type="radio"
              name="location"
              id="location"
              checked={location === "Online"}
              value="Online"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
            Online
          </label>
          <br></br>
          <label>Instrument:</label>
          <label htmlFor="instrument">
            <input
              type="radio"
              name="instrument"
              id="instrument"
              value="Guitar"
              checked={instrument === "Guitar"}
              onChange={(e) => {
                setInstrument(e.target.value);
              }}
            />
            Guitar
          </label>
          <label htmlFor="instrument">
            <input
              type="radio"
              name="instrument"
              id="instrument"
              value="Piano"
              checked={instrument === "Piano"}
              onChange={(e) => {
                setInstrument(e.target.value);
              }}
            />
            Piano
          </label>
          <label htmlFor="instrument">
            <input
              type="radio"
              name="instrument"
              id="instrument"
              value="Voice"
              checked={instrument === "Voice"}
              onChange={(e) => {
                setInstrument(e.target.value);
              }}
            />
            Voice
          </label>
          <br></br>
          <button class="button" onClick={updateBooking}>
            <p class="links">Edit Booking</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default MyBookings;
