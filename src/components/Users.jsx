import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../services/userServices";
import { deleteUsers } from "../services/userServices";
import image from "../assets/mv2.gif";

const Users = () => {
  const [users, setUsers] = useState([]); //stores the users
  const [is_admin, setisAdmin] = useState(false); //stores the is_admin
  const [id, setId] = useState(); //stores the id
  const [username, setUsername] = useState(); //stores the username
  const editUser = () => setShowResults(true); //shows the results
  const [showResults, setShowResults] = React.useState(false); //shows the results
  const navigate = useNavigate(); //navigates to the edit user form

  const fetchData = async () => {
    const response = await getUsers(); //fetches all users from the database
    setUsers(response); //sets the users to the response
  };

  function deleteUser(id) {
    deleteUsers(id) //deletes the user from the database
      .then(() => {
        //if the user is deleted successfully
        fetchData(); //fetches all users from the database
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchData(); //fetches all users from the database
  }, []);

  function selectUser(id) {
    let user = users.find((user) => user.id === id); //finds the user to be edited
    if (user.is_admin === false) {
      //if the user is not an admin
      setId(user.id); //sets the id of the user to be edited
      setUsername(user.username); //sets the username of the user to be edited
      setisAdmin((user.is_admin = true)); //sets the is_admin of the user to be edited
    } else {
      setId(user.id); //sets the id of the user to be edited
      setUsername(user.username); //sets the username of the user to be edited
      setisAdmin((user.is_admin = false)); //sets the is_admin of the user to be edited
    }
  }
  function updateUser() {
    let newuser = { id, username, is_admin }; //creates a new user object
    fetch(`https://mia-music-studios-api.herokuapp.com/users/${id}`, {
      method: "PUT", //updates the user in the database
      headers: {
        "Content-Type": "application/json", //sets the content type of the request to json
      },
      body: JSON.stringify(newuser), //sets the body of the request to the new user object
    });
    navigate("/"); //navigates to the home page
    alert("User updated"); //alerts the user that the user has been updated
  }

  return (
    <>
      <div>
        <div>
          <h1 class="title">All Users</h1>
        </div>
        <div class="image">
          <img src={image} alt="music" />
        </div>
        <div class="info"></div>
        {users.length > 0 && (
          <table class="styled-table">
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Is Admin</th>
              <th>Operations</th>
            </tr>
            <tbody>
              {users.map((user) => (
                <tr>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.is_admin ? "Yes" : "No"}</td>
                  <td>
                    <button
                      class="button"
                      onClick={() => {
                        selectUser(user.id);
                      }}
                    >
                      {showResults ? <return /> : null}
                      <p class="links">Make Admin</p>
                    </button>
                    <button
                      class="button"
                      onClick={() => deleteUser(user.id, { editUser })}
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
          <h1>Make User Admin</h1>
          <p>Did you want to change</p>
          <input type="text" disabled={true} value={username} />
          <p>Administrator status?</p>
          <input type="hidden" value={id} />
          <input type="hidden" value={is_admin} />
          <br></br>
          <button class="button" onClick={updateUser}>
            <p class="links">Change Now</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Users;
