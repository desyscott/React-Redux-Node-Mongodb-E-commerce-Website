import React from "react";
import { Link } from "react-router-dom";
import loginUseForm from "./loginUseForm";

function Login() {
  const { handleChange, values, handleSubmit, error } = loginUseForm();

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <h3>welcome back!</h3>
          {error.emailVerifyMessage && <p>{error.emailVerifyMessage}</p>}
          <div>
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              value={values.email}
              onChange={handleChange}
              required
            />
          </div>
          {error.emailError && <p>{error.emailError}</p>}
          <div>
            <label for="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              required
            />
          </div>
          {error.passwordError && <p>{error.passwordError}</p>}
          <div>
            <a href="/forgot-password">Forget password ?</a>
          </div>

          <button type="submit">log In</button>

          <div>
            Don't have an account <Link to="/signUp">sign up</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
