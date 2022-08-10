import React from "react"
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"
import "./NavBar.css"


const mapState=({cartData})=>({
    cartItems:cartData.cartItems,
})
const NavBar =()=>{
    const {cartItems}=useSelector(mapState);
    return(
        <div className="header">
   <div className="nav-logo">
   <Link to="/" className="nav-logo-link">Scottex</Link>
   </div>
   
   <div>
   <input  className="search_input"/>
   </div>
   
   <ul className="nav-links">
   <li>
    <Link to="/cart">Cart
        {cartItems.length > 0 && 
        ( <span className="badge">
         {cartItems.length}
         </span>)
       }
    </Link>
   </li>
   <li> <Link to="/signIn">SignIn</Link></li>
   </ul>
        </div>
    )
}


export default NavBar