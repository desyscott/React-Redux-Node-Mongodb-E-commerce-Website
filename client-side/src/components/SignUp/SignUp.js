import React,{useEffect,useRef} from "react";
import { Link,useLocation } from "react-router-dom";
import useForm from "./useForm";
import "./signUp.css"

function SignUp() {
  const inputRef=useRef();
  const location=useLocation();
  
  const redirect = location.search ? location.search.split("=")[1]:"/";
  
  useEffect(()=>{
    inputRef.current.focus()
  },[])
  
  const { handleChange, values, handleSubmit, error, userVerificationMessage } =
    useForm();
    

  return (
    <>
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <h1>
           Create Account
          </h1>
          {userVerificationMessage.verifyMessage && (
            <p>{userVerificationMessage.verifyMessage}</p>
          )}
          <div>
            <label htmlFor="username">Name</label>
            <input
            ref={inputRef}
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
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Enter confirm password"
              required
              value={values.confirmPassword}
              onChange={handleChange}
            />
          </div>
          
              
          <div>
          <label/>
          <button type="submit">Sign Up</button>
          </div>
          <div>
           <label/>
            <div>
             Already have an account? {' '} 
             <Link to={`/signIn?redirect=${redirect}`}>Sign-In</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
