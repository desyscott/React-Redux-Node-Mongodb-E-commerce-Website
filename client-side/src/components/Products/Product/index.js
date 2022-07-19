import React from 'react'
import {Link} from "react-router-dom"
import Ratings from "../../Ratings/index"
import "./product.css"

const Product=(props)=>{
  const {product}=props

  
  return (
  <div className="card" key={product._id}>
      <Link to={`/product/${product._id}`}>
         <img className="medium" src={product.img} alt={product.name}/>
      </Link>
   <div className="product-info">
        <Link to={`/product/${product._id}`}>
        <h2 className="product-name">{product.name}</h2>
        </Link>
     <Ratings  rating={product.rating} numReviews={product.numReviews}/>
      <div className="product-price ">${product.price}</div>
    </div>
  </div>

  )
}

export default Product
