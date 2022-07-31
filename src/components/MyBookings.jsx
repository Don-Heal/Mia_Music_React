import React, { useEffect, useState } from "react";
import { useGlobalState } from "../utils/stateContext";
import { Link } from "react-router-dom";

const AsyncAwait = () => {
  const [bookings, setBookings] = useState([]);
  const { store } = useGlobalState();
  const { loggedInUser } = store;
  const mybookings = bookings.filter((booking) => {
    return booking.username === loggedInUser;
  });
  const [user_id, setUser_id] = useState(null);
  const [username, setUsername] = useState(null);
  const [id, setId] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [location, setLocation] = useState();
  const [instrument, setInstrument] = useState();

  const fetchData = async () => {
    const response = await fetch("https://mia-music-studios-api.herokuapp.com");
    const data = await response.json();
    setBookings(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function deleteBooking(id) {
    fetch(`https://mia-music-studios-api.herokuapp.com/${id}`, {
      method: "DELETE",
    });
    setBookings(bookings.filter((booking) => booking.id !== id));
  }

  function selectBooking(id) {
    const booking = bookings.find((booking) => booking.id === id);
    setUser_id(booking.user_id);
    setUsername(booking.username);
    setId(booking.id);
    setDate(booking.date);
    setTime(booking.time);
    setLocation(booking.location);
    setInstrument(booking.instrument);
  }

  function updateBooking() {
    let booking = { user_id, username, id, date, time, location, instrument };
    fetch(`https://mia-music-studios-api.herokuapp.com/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    });
    window.location.reload();
  }
  if (booking.length > 0) {
    return (
      <>
        <div>
          <div>
            <h1 class="title">Your Bookings</h1>
          </div>
          {mybookings.length > 0 && (
            <table border="1" style={{ float: "left" }}>
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
                      <button onClick={() => selectBooking(booking.id)}>
                        Edit
                      </button>
                      <button onClick={() => deleteBooking(booking.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <input type="hidden" value={user_id} />
          <input type="hidden" value={username} />
          <input type="hidden" value={id} />
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <br></br>
          <input
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
          <button onClick={updateBooking}> Edit Booking </button>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <h1>You dont have any bookings to view</h1>
        Click {<Link to="/bookings/new">here</Link>} to make a new booking
      </div>
    );
  }
};

export default AsyncAwait;
