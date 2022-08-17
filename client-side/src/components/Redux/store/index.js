import {createStore,applyMiddleware,compose} from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"

import rootReducer from '../rootReducer'

export const middlewares = [thunk,logger]

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//we get the cartItem from the localStorage and convert it to an array containing the items
const  initialState={
    userData:{
        currentUser:localStorage.getItem("currentUser")
        ? JSON.parse(localStorage.getItem("currentUser"))
        : null
    }, 
    
    cartData:{
        cartItems:localStorage.getItem('cartItems') 
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
        
        shippingAddress:localStorage.getItem("shippingAddress")
        ?JSON.parse(localStorage.getItem("shippingAddress"))
        :{}, 
        paymentMethod:'PayPal',
    }
    

}
const store= createStore(rootReducer,
                         initialState,
                         composeEnhancer(applyMiddleware(...middlewares)))

export {store}