import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import useForm from "./useForm";

function SignUp() {
  const { handleChange, values, handleSubmit, error, userVerificationMessage } =
    useForm();

  return (
    <>
      <div>
        <form className="form-container" onSubmit={handleSubmit}>
          <h1>
            Get Started with us today ! Create an account by filling out the
            form below.
          </h1>
          {userVerificationMessage.verifyMessage && (
            <p>{userVerificationMessage.verifyMessage}</p>
          )}
          <div>
            <label for="username">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter name"
              value={values.name}
              onChange={handleChange}
            />
          </div>
          {error.nameError && <p>{error.nameError}</p>}
          <div>
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={values.email}
              onChange={handleChange}
            />
          </div>
          {error.emailError && <p>{error.emailError}</p>}
          <div>
            <label for="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              value={values.password}
              onChange={handleChange}
            />
          </div>
          {error.passwordError && <p>{error.passwordError}</p>}

          <button type="submit">Sign Up</button>

          <span>
            Already have an account? <Link to="/login">login</Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default SignUp;
