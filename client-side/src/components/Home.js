import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [users, setUsers] = useState([]);

  const history = useHistory();
  useEffect(() => {
    axios
      .get("/user1")
      .then((res) => {
        const data = res.data;
        setUsers(data.userList);
        if (data === "there is no token") {
          history.replace("/login");
        }
        if (data.error) {
          history.replace("/login");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [history]);

  const handleSignOut = () => {
    axios
      .get("auth/logout")
      .then((res) => {
        const data = res.data;
        console.log(data);
        history.replace("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <p>Home</p>
      {users && users.map((user) => <li>{user}</li>)}

      <button onClick={handleSignOut}>logout</button>
    </div>
  );
};

export default Home;
