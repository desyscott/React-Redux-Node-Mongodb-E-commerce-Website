import React from "react";
import { Link } from "react-router-dom";
import useForm from "./useForm";
import "./signUp.css"

function SignUp() {
  const { handleChange, values, handleSubmit, error, userVerificationMessage } =
    useForm();

  return (
    <>
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <h1>
            Get Started with us today ! Create an account by filling out the
            form below.
          </h1>
          {userVerificationMessage.verifyMessage && (
            <p>{userVerificationMessage.verifyMessage}</p>
          )}
          <div>
            <label for="username">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter name"
              required
              value={values.name}
              onChange={handleChange}
            />
          </div>
          {error.nameError && <p>{error.nameError}</p>}
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={values.email}
              required
              onChange={handleChange}
            />
          </div>
          {error.emailError && <p>{error.emailError}</p>}
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              required
              value={values.password}
              onChange={handleChange}
            />
          </div>
          {error.passwordError && <p>{error.passwordError}</p>}
              
          <div>
          <label/>
          <button type="submit">Sign Up</button>
          </div>
          <div>
           <label/>
            <div>
             Already have an account? {' '} 
             <Link to="/signIn">Sign In</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
