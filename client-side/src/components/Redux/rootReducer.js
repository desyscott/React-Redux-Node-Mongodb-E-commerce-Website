import {combineReducers} from "redux"


import productsReducer from "./productReducer/productsReducer"
import addToCartReducer from "./cartReducer/cartsReducer";

const rootReducer = combineReducers({
    productsData:productsReducer,
    cartData:addToCartReducer
})

export default rootReducer;