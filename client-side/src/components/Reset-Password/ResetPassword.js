import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import queryString from "query-string";
import { useHistory } from "react-router-dom";

function ResetPassword() {
  const [values, setValues] = useState({
    password: "",
    password2: "",
  });

  const [invalidUser, setInvalidUser] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(true);
  const [success, setSuccess] = useState(false);

  const location = useLocation();
  const history = useHistory();
  const { uniqueToken, id } = queryString.parse(location.search);
  // console.log(location);
  const verifyToken = async () => {
    // console.log(uniqueToken);
    try {
      const { data } = await axios.get(
        `http://localhost:5000/auth/verify-resetToken?uniqueToken=${uniqueToken}&id=${id}`
      );
      // console.log(data);
      setBusy(false);
    } catch (error) {
      if (error?.response?.data) {
        const { data } = error.response;
        if (!data.success) {
          setInvalidUser(data.error);
          console.log(data.error);
        }
        console.log(error);
      }
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, password2 } = values;

    if (password.length < 6) {
      return setError("It must be at least 6 characters long");
    }
    if (password !== password2) {
      return setError("password do not matches");
    }

    try {
      setBusy(true);
      const { data } = await axios.post(
        `/auth/reset-password?uniqueToken=${uniqueToken}&id=${id}`,
        { password }
      );
      // console.log(data);
      setBusy(false);
      if (data.success) {
        setSuccess(true);
        history.replace("/reset-password");
      }
    } catch (error) {
      setBusy(false);
      if (error?.response?.data) {
        const { data } = error.response;
        if (!data.success) return setError(data.error);
      }
      console.log(error);
    }
  };

  if (success) {
    return (
      <div>
        <h1>You have successfully reset your password</h1>
      </div>
    );
  }

  if (invalidUser) {
    return (
      <div>
        <h1>{invalidUser}</h1>
      </div>
    );
  }
  if (busy) {
    return (
      <div>
        <h3>wait a minute verifying link</h3>
      </div>
    );
  }

  return (
    <>
      <p>reset password</p>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <div>
          <label for="password">New Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label for="password2">Confirm Password: </label>
          <input
            type="password"
            name="password2"
            id="password2"
            value={values.password2}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </>
  );
}

export default ResetPassword;
