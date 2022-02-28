import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/auth/forget-password", { email })
      .then((res) => {
        const data = res.data;
        if (data) {
          console.log(data);
        }
      })
      .catch((err) => {
        if (err?.response?.data) {
          const { data } = err.response;
          console.log(data);
        }
        console.log(err.message);
      });
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <p>forgot password ?</p>
          <div>
            <label for="email">Email:</label>
            <input
              type="text"
              placeholder="Enter your email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <button type="submit">submit</button>
        </form>
        <Link to="/login">Back to login</Link>
      </div>
    </>
  );
}

export default ForgotPassword;
