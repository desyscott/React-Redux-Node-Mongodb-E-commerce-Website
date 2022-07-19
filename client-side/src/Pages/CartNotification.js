import React,{useEffect} from 'react'
import {useParams,useLocation} from 'react-router-dom'
import {useDispatch} from "react-redux"
import { addCartItem } from './../components/Redux/cartReducer/cartActions';

function CartNotification(props) {
  const dispatch = useDispatch()
  const {productId}=useParams()
  const {search}=useLocation()
  const qty=Number(search?search.split("=")[1]:1)
  
  useEffect(()=>{
    if(productId){
      dispatch(addCartItem(productId,qty))
    } 
  },[dispatch,productId,qty])
  
  return (
    <div>
    <h2>Added to cart</h2>
    
    <p>
     ProductID :{productId} Qty:{qty}
    </p>
    </div>
  )
}

export default CartNotification