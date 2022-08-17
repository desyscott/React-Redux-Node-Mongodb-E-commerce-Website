import {userTypes} from "./userTypes"

const USER_STATE={
    currentUser:null,
    loading:false,
    signInErrors:null,
    signUpErrors:null,
    userVerificationMessage:null,
}


const usersReducer=(state=USER_STATE,action)=>{
    switch(action.type){
        case userTypes.USER_SIGNIN_REQUEST :
        return{
            ...state,
            loading:true
        }
        case userTypes.USER_SIGNIN_SUCCESS :
        return{
            ...state,
            loading:false,
            currentUser:action.payLoad,
            signInErrors:null      
        }
        
        case userTypes.USER_SIGNIN_ERROR :
        return{
            ...state,
            loading:false,
            signInErrors:action.payLoad,
          
        }
        
        case userTypes.USER_SIGNIN_FAIL:
        return{
            ...state,
            loading:false,
            error:action.payLoad
        }
        
        case userTypes.USER_SIGNUP_REQUEST:
        return{
            ...state,
            loading:true
        }
        
        
        case userTypes.USER_SIGNUP_VERIFICATION:
        return{
            ...state,
            loading:false,
            userVerificationMessage:action.payLoad,
            signUpErrors:null
        }
        
        case userTypes.USER_SIGNUP_ERROR:
        return{
            ...state,
            loading:false,
            signUpErrors:action.payLoad,
        }
        
        case userTypes.USER_SIGNUP_FAIL:
        return{
            ...state,
            loading:false,
            error:action.payLoad
        }
        
        
        case userTypes.USER_SIGNOUT_SUCCESS:
        return{
            
        }
        
        
     default:return state
    }
}

export default usersReducer;