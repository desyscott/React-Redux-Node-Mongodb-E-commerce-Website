import React,{useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {Link, useHistory} from "react-router-dom"
import {createStructuredSelector} from "reselect"
import CheckoutSteps from '../components/CheckOutSteps/CheckoutSteps';
import { selectCartItems,selectCartItemCount,selectPaymentMethod,selectCartTotalAmount,selectShippingAddress} from '../components/Redux/Reducers/cartReducer/cartUtils';

const mapState =createStructuredSelector({
  paymentMethod:selectPaymentMethod,
  shippingAddress:selectShippingAddress,
  cartItems:selectCartItems,
  totalItems:selectCartItemCount,
  totalAmount:selectCartTotalAmount 
})

function PlaceOrder() {
  // const dispatch=useDispatch()
  const {cartItems,shippingAddress,paymentMethod,totalAmount}=useSelector(mapState);
  const cartData=useSelector((state)=>state.cartData);
  const history = useHistory();
  
  
  if(!cartData.paymentMethod){
    history.push("/payment")
  }
  
  const toPrice=(num)=>Number(num.toFixed(2));//5.123 =>"5.12" =>5.12
  
  cartData.itemsPrice=toPrice(totalAmount)
  cartData.shippingPrice=cartData.itemsPrice > 100  ? toPrice(0):toPrice(10);
  cartData.taxPrice=toPrice(0.15 * cartData.itemsPrice);
  cartData.totalOrderPrice = cartData.itemsPrice + cartData.shippingPrice + cartData.taxPrice
  
  const placeOrderHandler=()=>{
    console.log("place order")
  }

  
  useEffect(()=>{
    console.log(cartData.paymentMethod)
  },[])
  
  return (
    <div className="main">
    <CheckoutSteps step1 step2 step3 step4/>
    <div className="row top">
      <div className="col-2">
        <ul>
          <li>
            <div className="card card-body">
             <h1>
             Shipping
             </h1>
             <p>
              <strong>Name:</strong>{shippingAddress.fullName}<br/>
              <strong>Address:</strong>{shippingAddress.city},{shippingAddress.address}, 
              {shippingAddress.postalCode}, {shippingAddress.country}
             </p>
            </div>
          </li>
          <li>
            <div className="card card-body">
             <h1>
             Payment
             </h1>
             <p>
              <strong>Method:</strong>{paymentMethod}
             </p>
            </div>
          </li>
          <li>
            <div className="card card-body">
             <h1>
            Order Items
             </h1>
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
            ${item.qty} x ${item.price} = ${item.qty * item.price}
            </div>
            </div>
          </li>
        ))}
         </ul>
            </div>
          </li>
        </ul>
      </div>
      <div className="col-1">
        <div className="card card-body">
        <ul>
           <li>
             <h2>Order summary</h2>
           </li>   
           <li>
             <div className="row">
               <div>items</div>
               <div>${cartData.itemsPrice.toFixed(2)}</div>
             </div>
           </li>   
           <li>
             <div className="row">
               <div>shipping</div>
               <div>${cartData.shippingPrice.toFixed(2)}</div>
             </div>
           </li>   
           <li>
             <div className="row">
               <div>Tax</div>
               <div>${cartData.taxPrice}</div>
             </div>
           </li>   
           <li>
             <div className="row">
               <strong>Total Order</strong>
               <strong>${cartData.totalOrderPrice.toFixed(2)}</strong>
             </div>
           </li>   
           <li>
           <button type="button" 
           onClick={placeOrderHandler}
           disabled={cartItems.length === 0}>Place Order</button>
           </li>
        </ul>
        </div>
      </div>
    </div>
    </div>
  )
}

export default  PlaceOrder;