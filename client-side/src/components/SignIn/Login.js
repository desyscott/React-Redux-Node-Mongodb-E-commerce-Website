import React,{useEffect,useRef} from "react";
import { Link,useHistory,useLocation} from "react-router-dom";
import {useSelector} from "react-redux"
import loginUseForm from "./loginUseForm";
import "./signIn.css"
import LoadingBox from "../LoadingBox";

const mapState=({userData})=>({
  currentUser:userData.currentUser,
  signInError:userData.signInErrors,
  loading:userData.loading,
  
})

function Login() {
  const {currentUser,loading,signInError}=useSelector(mapState);
  const inputRef=useRef()
  const location=useLocation()
  const history=useHistory()
  
  const redirect = location.search ? location.search.split("=")[1]:"/";
  
  const { handleChange, values, handleSubmit} = loginUseForm();
  
  useEffect(()=>{
    if(currentUser){
     history.push(redirect);
    }
  },[history,redirect,currentUser])
  
  useEffect(()=>{
    inputRef.current.focus();
  },[])
 
  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="form">
           <div>
          <h1>Sign In</h1>
          </div>
          
          {signInError && <p>{signInError.emailVerifyMessage}</p>}
          <div>
            <label htmlFor="email">Email</label>
            <input
              ref={inputRef}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              required
              value={values.email}
              onChange={handleChange}
             
            />
          </div>
          { signInError && <p>{ signInError.email}</p>}
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
          { signInError && <p>{ signInError.password}</p>}
          <div>
             <div>
            <Link to="/forgot-password">Forget password ?</Link>
            </div>
          </div>
           <div>
            <label/>
            <button type="submit">{loading ?<LoadingBox/>:<>Sign In</>}</button>
           </div>
          <div>
          <label/>
            <div>
            Don't have an account? {' '} 
            <Link to={`/signUp?redirect=${redirect}`}>create your account</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
