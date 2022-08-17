import {combineReducers} from "redux"

import usersReducer from "./Reducers/userReducer/userReducer"
import productsReducer from "./Reducers/productReducer/productsReducer"
import addToCartReducer from "./Reducers/cartReducer/cartsReducer";

const rootReducer = combineReducers({
    productsData:productsReducer,
    cartData:addToCartReducer,
    userData:usersReducer,
})

export default rootReducer;