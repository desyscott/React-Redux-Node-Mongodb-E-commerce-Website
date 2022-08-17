import React, { useState, useEffect } from "react";
import { Link, useParams,useLocation } from "react-router-dom";
import axios from "axios";

const EmailVerified=()=>{
  const location=useLocation()
  
  const [validUrl, setValidUrl] = useState(false);
  const [busy, setBusy] = useState(true);
  const redirect = location.search ? location.search.split("=")[1]:"/";
  const params = useParams();

  const verifyEmail = async () => {
    try {
      const { data } = await axios.get(
        `/api/auth/email-verification/${params.userId}/${params.verificationString}`
      );
      setBusy(false);
      console.log(data);
    } catch (error) {
      if (error?.response?.data) {
        const { data } = error.response;
        console.log(data.error);
        if (!data.success) {
          setBusy(false);
          setValidUrl(true);
          setValidUrl(data.error);
        }
      }
      console.log(error);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  if (busy) {
    return (
      <div>
        <h3>wait a moment verifying email</h3>
      </div>
    );
  }
  
  if (validUrl) {
    return (
      <div>
        <h1>{validUrl}</h1>
      </div>
    );
  }

  return (
    <div>
      <p>successfully verified your email you can login</p>
      <Link to={`/signin?redirect=${redirect}`}>login</Link>
    </div>
  );
}

export default EmailVerified;
