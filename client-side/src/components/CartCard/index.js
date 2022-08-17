import React from 'react'
import {useSelector,useDispatch} from "react-redux"
import { Link,useHistory } from 'react-router-dom'
import MessageBox from '../MessageBox'
import { addCartItem,removeCartItem } from '../Redux/Reducers/cartReducer/cartActions'
import {createStructuredSelector} from "reselect"
import { selectCartItems, selectCartItemCount, selectCartTotalAmount  } from '../Redux/Reducers/cartReducer/cartUtils'
import "./index.css"


 const mapState=createStructuredSelector({
   cartItems:selectCartItems,
   totalItems: selectCartItemCount,
   totalAmount:selectCartTotalAmount
   })

const CartCard=()=>{
  const {cartItems, totalItems,totalAmount}=useSelector(mapState)
  const dispatch =useDispatch()
  const history=useHistory()
  
  
  const RemoveFromCartHandler=(productId)=>{
    dispatch(removeCartItem({productId}))
  }
  
  const checkOutHandler=()=>{
    history.push("/signIn?redirect=shipping");
  }
  
  return (
    <div className="main">
    <div className="row top">
    
    <div className="col-2">
    <h1>Shopping Cart</h1>
    {cartItems.length === 0?
     (
       <MessageBox>
       Cart is empty <Link to="/">Go Shopping</Link>
       </MessageBox>
       ):(
         <ul>
        {cartItems.map(item=>(
          <li key={item.product}>
          <div className="row">
          
            <div>
              <img src={item.image} alt={item.name} className="small"/>
            </div>
            
            <div className="min-30">
              <Link to={`/product/${item.product}`}>{item.name}</Link>
            </div>
            
            <div>
              <select value={item.qty} 
              onChange={e=>dispatch(addCartItem(item.product,Number(e.target.value)))}>
            
              {[...Array(item.countInStock).keys()].map(x=>
                <option key={x + 1} value={x + 1}>
                       {x + 1}
                </option>
              )}
              </select>
            </div>
            
            <div>
               ${item.price}
            </div>
              <div>
               <button type="button" onClick={()=>RemoveFromCartHandler(item.product)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
         </ul>
       )
      }
    </div>
    <div classnames="col-1">
        <div classnames="card product-info">
          <ul>
            <li>
              <h2>Subtotal ({totalItems} items):${totalAmount}</h2>
            </li>
            <li>
              <button type="button" onClick={checkOutHandler}
              disabled={cartItems.length === 0}>proceed to checkout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CartCard