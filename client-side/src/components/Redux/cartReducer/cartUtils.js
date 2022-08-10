import {createSelector} from "reselect"

export const selectCartData=(state)=>state.cartData

export const selectCartItems =createSelector(
    [selectCartData],
    cartData=>cartData.cartItems
)


export const selectCartItemCount =createSelector(
    [selectCartItems],
    cartItems=>cartItems.reduce((a,cartItem)=> a + cartItem.qty,0)
)

export const selectCartTotalAmount =createSelector(
    [selectCartItems],
    cartItems=>cartItems.reduce((a,cartItem)=> a + cartItem.qty*cartItem.price,0)
)