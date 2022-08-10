import cartTypes from "./cartTypes"

import {handleAddToCart,handleRemoveFromCart} from "./cartHandler"

const INITIAL_STATE={
    cartItems:[]
}

const addToCartReducer=(state=INITIAL_STATE,action)=>{
    
    switch(action.type){
    case cartTypes.ADD_TO_CART: 
     return{
         ...state,
           cartItems:handleAddToCart({
               prevCartItem:state.cartItems,
               nextCartItem:action.payLoad,
           })
        }
     
     case cartTypes.REMOVE_CART_ITEM:
     return{
         ...state,
         cartItems:handleRemoveFromCart({
             prevCartItem:state.cartItems,
             cartItemToRemove:action.payLoad
         })
     };
    default: return state
    }
    
}

export default addToCartReducer;