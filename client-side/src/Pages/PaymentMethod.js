import React ,{useState} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {useHistory} from "react-router-dom"
import CheckoutSteps from '../components/CheckOutSteps/CheckoutSteps'
import { savePaymentMethod } from '../components/Redux/Reducers/cartReducer/cartActions';


const mapState=({cartData})=>({
    shippingAddress:cartData.shippingAddress
});

function PaymentMethod() {
    const {shippingAddress}=useSelector(mapState);
    const dispatch=useDispatch()
    const history=useHistory()
    
    if(!shippingAddress.address){
        history.push("/shipping")
    }
    
    const [paymentMethod,setPaymentMethod]=useState('PayPal');
    
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push("/place-order")
    }
    
  return (
    <div className="main">
    <CheckoutSteps step1 step2 step3/>
    
    <form className="form" onSubmit={submitHandler}>
    <div>
     <h1>Payment Method</h1>
    </div>
    <div>
        <div>
            <input
            type="radio"
            id="paypal"
            value="PayPal"
            name="paymentMethod"
            required
            checked
            onChange={(e)=>setPaymentMethod(e.target.value)}
            />
            <label htmlFor="paypal">Paypal</label>
        </div>
    </div>
    <div>
        <div>
            <input
            type="radio"
            id="stripe"
            value="Stripe"
            name="paymentMethod"
            required
            onChange={(e)=>setPaymentMethod(e.target.value)}
            />
            <label htmlFor="stripe">Stripe</label>
        </div>
    </div>
    <div>
      <button type="submit">Continue</button>
    </div>
    </form>
    
    </div>
  )
}

export default PaymentMethod