import { useState } from "react";
import {useDispatch} from "react-redux"
import {signup} from "../Redux/Reducers/userReducer/userActions"
import axios from "axios"


const useForm = () => {
  const dispatch= useDispatch()
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});
  const [userVerificationMessage, setUserVerificationMessage] = useState({});

  const handleChange = (e) => {
    const {name,value}=e.target
    setValues({
      ...values,
      [name]:value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password,confirmPassword}=values;

    // setError({
    //   nameError: "",
    //   emailError: "",
    //   passwordError: "",
    // });
    
    // axios
    //   .post("/api/auth/signup", {
    //     name: values.name,
    //     email: values.email,
    //     password: values.password,
    //   })
    //   .then(res => {
    //     const data = res.data;
    //     console.log(data);
        
    //     if(!data.user.verified){
    //       setUserVerificationMessage({
    //         verifyMessage:
    //           "Confirmation message has been sent to your inbox please check and verify your email",
    //       });
    //     }
        
        
    //     if(data.errors){
    //       // const {email,name,password}=data.errors;
    //       // console.log("data.errors",password)
    //       console.log("data.errors",data.errors)
    //       // setError({
    //       //   nameError: data.errors.name,
    //       //   emailError: data.errors.email,
    //       //   passwordError: data.errors.password,
    //       // });
         
    //     }
        
       
      
    //   })
    //   .catch((err) => {
    //     if(err?.response?.data){
    //       const {data}=err?.response
    //       console.log("err message",data);
    //     }
      
    //   });
    if(password !== confirmPassword){
      alert("password and confirm password do not match")
    }else{
      dispatch(signup(name,email,password));
    }
 
  };
  return { handleChange,values,handleSubmit,error,userVerificationMessage};
};

export default useForm;
