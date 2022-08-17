import React from "react"
import "./index.css"


function CheckoutSteps(props){
    return(
        <div className="row checkout-steps">
        <div className={props.step1 ? "active":""}>Sign-In</div>
        <div className={props.step2 ? "active":""}>Shipping</div>
        <div className={props.step3 ? "active":""}>Payment</div>
        <div className={props.step4 ? "active":""}>Place order</div>
        </div>
    )
}

export default CheckoutSteps;