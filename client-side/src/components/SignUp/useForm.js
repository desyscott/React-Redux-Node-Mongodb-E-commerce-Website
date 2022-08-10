import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useForm = () => {
    const history = useHistory();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
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

    setError({
      nameError: "",
      emailError: "",
      passwordError: "",
    });
    
    axios
      .post("/api/auth/signup", {
        name: values.name,
        email: values.email,
        password: values.password,
      })
      .then(res => {
        const data = res.data;
        console.log(data);
        
        if (!data.user.verified) {
          setUserVerificationMessage({
            verifyMessage:
              "Confirmation message has been sent to your inbox please check and verify your email",
          });
        }
        
        
        if (data.errors) {
          setError({
            nameError: data.errors.name,
            emailError: data.errors.email,
            passwordError: data.errors.password,
          });
        }
        
       
      
      })
      .catch((err) => {
        console.log("err message",err);
      });
  };
  return { handleChange,values,handleSubmit,error,userVerificationMessage};
};

export default useForm;
