import React from "react";
import { Link } from "react-router-dom";
import loginUseForm from "./loginUseForm";
import "./signIn.css"


function Login() {
  const { handleChange, values, handleSubmit, error } = loginUseForm();

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="form">
           <div>
          <h1>Sign In</h1>
          </div>
          {error.emailVerifyMessage && <p>{error.emailVerifyMessage}</p>}
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              required
              value={values.email}
              onChange={handleChange}
             
            />
          </div>
          {error.emailError && <p>{error.emailError}</p>}
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              value={values.password}
              onChange={handleChange}
            />
          </div>
          {error.passwordError && <p>{error.passwordError}</p>}
          <div>
             <div>
            <Link to="/forgot-password">Forget password ?</Link>
            </div>
          </div>
           <div>
            <label/>
            <button type="submit">Sign In</button>
           </div>
          <div>
          <label/>
            <div>
            Don't have an account? {' '} 
            <Link to="/signUp">create your account</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
