import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux"
import {signOut} from "../components/Redux/Reducers/userReducer/userActions"

const Home = () => {
     const history = useHistory();
     const dispatch=useDispatch()
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/user1")
      .then((res) => {
        const data = res.data;
        setUsers(data.userList);
        
        if (data === "there is no token") {
          history.replace("/signin");
        }
        
        if (data.error) {
          history.replace("/signin");
        }
        
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [history]);

             
  const handleSignOut = () => {
   dispatch(signOut())
  };

  return (
    <div>
      <p>Home</p>
      {users && users.map((user,index) => <li key={index}>{user}</li>)}

      <button onClick={handleSignOut}>logout</button>
    </div>
  );
};

export default Home;
