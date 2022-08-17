
//finding out if the item already exist in the cart
export const existingCartItem=({prevCartItem,nextCartItem}) =>{
    return prevCartItem.find(cartItem=>cartItem.product===nextCartItem.product)
}

export const handleAddToCart=({prevCartItem,nextCartItem})=>{
     
//if the item to be added to the cart already exist we just replace it with new one
    const cartItemExits=existingCartItem({prevCartItem,nextCartItem})
    
    if(cartItemExits){
    return prevCartItem.map(cartItem=>cartItem.product === cartItemExits.product ? 
                            nextCartItem:cartItem)
     
    }
    
//or else  if the item new and don't exist in our cart
  return [
      ...prevCartItem, 
        nextCartItem,
        ]
}


export const handleRemoveFromCart=({prevCartItem,cartItemToRemove})=>{
    //filter out the product whose id is equal to the payLoad action id
    return prevCartItem.filter(cartItem => cartItem.product !== cartItemToRemove.productId)
}