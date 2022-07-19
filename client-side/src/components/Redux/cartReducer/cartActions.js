import cartTypes from "./cartTypes";
import Axios from "axios"


export const addCartItem=(productId,qty)=>async(dispatch,getState)=>{
    
    try{
        const {data} = await Axios.get(`/api/products/${productId}`);
        
        dispatch({
       type:cartTypes.ADD_TO_CART,
       payLoad:{
           name:data.name,
           img:data.img,
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