import cartTypes from "./cartTypes"

import {handleAddToCart} from "./cartHandler"

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
    default: return state
    }
    
}

export default addToCartReducer;