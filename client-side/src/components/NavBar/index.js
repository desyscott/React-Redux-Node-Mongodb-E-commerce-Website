import React from "react"
import {Link} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"

import {signOut} from "../Redux/Reducers/userReducer/userActions"
import "./NavBar.css"


const mapState=({cartData})=>({
    cartItems:cartData.cartItems,
})

const NavBar =()=>{
    const dispatch=useDispatch()
    const {cartItems}=useSelector(mapState);
    const {currentUser}=useSelector((state)=>state.userData);
   
    const handleSignOut=()=>{
        dispatch(signOut())
    }
    
    return(
        <div className="header">
   <div className="nav-logo">
   <Link to="/" className="nav-logo-link">Scottex</Link>
   </div>
   
   <div>
   <input  className="search_input"/>
   </div>
   
   <div className="nav-links">
    <Link to="/cart">Cart
        {cartItems.length > 0 && 
        ( <span className="badge">
         {cartItems.length}
         </span>)
       }
    </Link>
 
   {currentUser? 
    (
     <div className="dropdown">
        <Link to="#">{currentUser.name}</Link>
        <ul className="dropdown-content">
          <Link to="#" onClick={handleSignOut}>signOut</Link>
        </ul>
    </div> )
    :
   (<Link to="/signIn">SignIn</Link>  ) 
    }
 
   </div>
        </div>
    )
}


export default NavBar