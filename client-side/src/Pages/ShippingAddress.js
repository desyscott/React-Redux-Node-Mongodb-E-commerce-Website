import React,{useState} from 'react'
import {useSelector,useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import CheckoutSteps from '../components/CheckOutSteps/CheckoutSteps'
import { saveShippingAddress } from '../components/Redux/Reducers/cartReducer/cartActions'

const mapState=({cartData})=>({
  shippingAddress:cartData.shippingAddress
})


function ShippingAddress() {
  const history=useHistory()
  const {shippingAddress}=useSelector(mapState)
  const currentUser=useSelector(({userData})=>userData.currentUser)
  
  const dispatch=useDispatch()
  if(!currentUser){
    history.push("/signIn")
  }
  
  const [values,setValues] =useState({
    fullName:shippingAddress.fullName,
    address:shippingAddress.address,
    city:shippingAddress.city,
    postalCode:shippingAddress.postalCode,
    country:shippingAddress.country
  })
  
  const handleChange=(e)=>{
    const {name,value}=e.target
    
    setValues({
      ...values,
     [name]:value
    })
  }
  
  const submitHandler=(e)=>{
   e.preventDefault() ;
   dispatch(saveShippingAddress({fullName,address,city,postalCode,country}));
   history.push("/payment")
  }
  
  const {fullName,address,city,postalCode,country}=values
  
  return (
    <div className="main">
      <CheckoutSteps step1 step2/>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input 
          type="text"
          name="fullName"
          id="fullName"
          placeholder="Enter full name"
          required
          value={fullName} 
          onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input 
          type="text"
          name="address"
          id="address"
          placeholder="Enter address"
          required
          value={address} 
          onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input 
          type="text"
          name="city"
          id="city"
          placeholder="Enter city"
          required
          value={city} 
          onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input 
          type="text"
          name="postalCode"
          id="postalCode"
          placeholder="Enter postal code"
          required
          value={postalCode} 
          onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input 
          type="text"
          name="country"
          id="country"
          placeholder="Enter country"
          required
          value={country} 
          onChange={handleChange}/>
        </div>
        <div>
        <label/>
        <button type="submit">Continue</button>
        </div>
      </form>
    </div>
  )
}

export default ShippingAddress;
