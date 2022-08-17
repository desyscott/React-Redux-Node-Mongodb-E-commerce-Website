import cartTypes from "./cartTypes";
import Axios from "axios"


export const addCartItem=(productId,qty)=>async(dispatch,getState)=>{
    
    try{
        const {data} = await Axios.get(`/api/products/${productId}`);
        
        dispatch({
       type:cartTypes.ADD_TO_CART,
       payLoad:{
           name:data.name,
           image:data.image,
           price:data.price,
           countInStock:data.countInStock,
           product:data._id,
           qty
       }
       });
        
    //adding the cartItems to local storage
   localStorage.setItem("cartItems",JSON.stringify(getState().cartData.cartItems));
        
    }catch(error){
      console.log(error)  
    }
    
    
}


export const removeCartItem=(productId)=>async(dispatch,getState)=>{
    dispatch({
        type:cartTypes.REMOVE_CART_ITEM,
        payLoad:productId
         });
    
    //updating the local storage 
    localStorage.setItem("cartItems", JSON.stringify(getState().cartData.cartItems));
}

export const saveShippingAddress=(data)=>(dispatch)=>{
    dispatch({type:cartTypes.SAVE_CART_SHIPPING_ADDRESS,payLoad:data})
    localStorage.setItem("shippingAddress",JSON.stringify(data));
    
}

export const savePaymentMethod=(data)=>(dispatch)=>{
    dispatch({type:cartTypes.SAVE_CART_PAYMENT_METHOD,payLoad:data})
}