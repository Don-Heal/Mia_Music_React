import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPrices } from "../services/pricesServices";
import image from "../assets/mv2.gif";

const AsyncAwait = () => {  
  const [prices, setPrices] = useState([]); //stores the prices of the tickets
  let admin = sessionStorage.getItem("is_admin"); //gets the current admin status fron session storage
  const [id, setPrice_id] = useState(); //stores the price id
  const [price, setPrice] = useState(); //stores the price

  const fetchData = async () => {
    const response = await getPrices(); //gets the prices
    setPrices(response);  //sets the prices
  };

  function selectPrice(id) {
    const price = prices.find((price) => price.id === id);  //finds the price with the id
    setPrice_id(price.id);  //sets the price id
    setPrice(price.price);  //sets the price
  }
  function updatePrice() {
    let newprice = { price, id }; //creates a new price object
    fetch(`https://mia-music-studios-api.herokuapp.com/prices/${id}`, {
      method: "PUT",  //updates the price in the database
      headers: {  //sets the headers of the request
        "Content-Type": "application/json", //sets the content type of the request to json
      },
      body: JSON.stringify(newprice), //sets the body of the request to the new price object
    });
    window.location.reload(); //reloads the page
      alert("Price updated"); //alerts the user that the price has been updated
    }
  console.log(prices);  //logs the prices

  useEffect(() => {
    fetchData();  //fetches the prices from the database
  }, []);
  if (admin === "true") {
    return (
      <div>
        <div>
          <h1 class="title">Mia's Prices</h1>
        </div>
        <div class="image">
          <img src={image} alt="music" />
        </div>
        <div class="info"></div>
        {prices.length > 0 && (
          <>
            <div>
              <table class="styled-table">
                <tr>
                  <th>Instrument</th>
                  <th>Current Price</th>
                  <th>Operations</th>
                </tr>
                <tbody>
                  {prices.map((price) => (
                    <tr>
                      <td>{price.instrument.toUpperCase()}</td>
                      <td>
                        {price.price.toLocaleString("en-AU", {
                          style: "currency",
                          currency: "AUD",
                        })}
                      </td>
                      <td>
                        <button
                          onClick={() => selectPrice(price.id)}
                          class="button"
                        >
                          <p class="links">Edit</p>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table class="styled-table">
                <div class="center">
                  <h2>Update Price</h2>
                  <tbody>
                    <input type="hidden" value={id} />
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
                    <div>
                      <button onClick={updatePrice} class="button">
                        <p class="links">Update Price</p>
                      </button>
                    </div>
                  </tbody>
                </div>
              </table>
            </div>
          </>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <h1 class="title">Mia's Prices</h1>
        </div>
        <div class="image">
          <img src={image} alt="music" />
        </div>
        <div class="price-info"></div>
        {prices.length > 0 && (
          <div>
            <table class="styled-table">
              <tr>
                <th>Instrument</th>
                <th>Current Price</th>
              </tr>
              <tbody>
                {prices.map((price) => (
                  <tr>
                    <td>{price.instrument.toUpperCase()}</td>
                    <td>
                      {price.price.toLocaleString("en-AU", {
                        style: "currency",
                        currency: "AUD",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div class="center">
          <button class="button">
            <Link to="/bookings">
              <p class="links">Book Now</p>
            </Link>
          </button>
        </div>
      </div>
    );
  }
};

export default AsyncAwait;
