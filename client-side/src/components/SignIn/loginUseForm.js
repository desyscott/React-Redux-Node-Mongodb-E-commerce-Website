import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const LoginUseForm = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;

    setError({
      emailError: "",
      errorPassword: "",
    });

    axios
      .post("/api/auth/signin", { email, password })
      .then((res) => {
        const data = res.data;
        console.log( "data",data);

        if (data.errors) {
          const { email, password, emailVerifyMessage } = data.errors;
          setError({
            emailError: email,
            passwordError: password,
            emailVerifyMessage: emailVerifyMessage,
          });
        }

        if (data.id) {
          history.replace("/home"); 
        }
        
      })
      .catch((err) => {
        if (err?.response?.data) {
          const { data } = err.response;
          console.log("data.error",data.error);
        }
      });
  };

  return { handleChange, values, handleSubmit, error };
};

export default LoginUseForm;
