import {userTypes} from "./userTypes"
import Axios from "axios"

export const signIn=(email,password) =>async(dispatch)=>{
    dispatch({
        type:userTypes.USER_SIGNIN_REQUEST,
        payLoad:{email,password}
    })
    
    try{
        const {data} =await Axios.post("/api/auth/signin",{email,password});
        
        if(data.errors){
            dispatch({
                type:userTypes.USER_SIGNIN_ERROR,
                payLoad:data.errors})
        }
           if(data.user){
            dispatch({
                type:userTypes.USER_SIGNIN_SUCCESS,
                payLoad:data.user})
           }
           
         
             if(data.user){
                localStorage.setItem("currentUser", JSON.stringify(data.user)); 
             }
            
    
        
    }catch(err){
        dispatch({
            type:userTypes.USER_SIGNIN_FAIL,
            payLoad:err.response && err.response.data.message
            ? err.response.data.message : err.message
        })
    }  
}

export const signOut=()=>async(dispatch)=>{
    localStorage.removeItem("currentUser")
    localStorage.removeItem("cartItems")
    localStorage.removeItem("shippingAddress")
    
    dispatch({type:userTypes.USER_SIGNOUT_SUCCESS})
}


export const signup=(name,email,password)=>async(dispatch)=>{
    dispatch({type:userTypes.USER_SIGNUP_REQUEST,payLoad:{email,password}})
    
    try{
        const {data} = await Axios.post("/api/auth/signup",{name,email,password});
        console.log("data",data);
        
      
        
        if(data.errors){
            dispatch({type:userTypes.USER_SIGNUP_ERROR,payLoad:data.errors})
            }
        
     if(!data.user.verified) {
                const VerificationMessage= "Confirmation message has been sent to your inbox please check and verify your email"
             dispatch({type:userTypes.USER_SIGNUP_VERIFICATION, payLoad:VerificationMessage})
               
              }
           
    }catch(err){
        if(err?.response?.data){
            const {data}=err?.response
            dispatch({type:userTypes.USER_SIGNUP_FAIL,
                payLoad:data})
  }
        }
   
}