import React,{useState,useEffect} from 'react'
import {useParams,useHistory,Link} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import {fetchProductRequest} from "../Redux/productReducer/productActions"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Ratings from "../Ratings/index"
import MessageBox from "../MessageBox/index"
import "./index.css"
import LoadingBox from '../LoadingBox'

const mapState=({productsData})=>({
  product:productsData.product,
  loading:productsData.loading,
  error:productsData.error
})

const ProductCard=()=> {
  const {product,loading,error} =useSelector(mapState)
  const dispatch =useDispatch()
  const history =useHistory()
  
  const [qty,setQty]=useState(1)
   const {productId}=useParams()
  
  useEffect(()=>{
    dispatch(fetchProductRequest(productId))
  },[dispatch,productId])
  
  const handleAddToCart=()=>{
    history.push(`/cart/Notify/${productId}?qty=${qty}`)
  }
  
  
   
   if(!product){
     return <div>No product found</div>
   }
   
   
  
   
  return (
    
    <div className="main">
     
    {loading ? 
     <LoadingBox/>
     :
     error ?<MessageBox variant="danger">{error}</MessageBox>
     :(
      <>
       <Link to ="/">Back to Results</Link>
         <div className="row top">
          <div className="col-1">
            <img  className="large" src={product.image} alt={product.name}/>
            
        </div>
          
        <div className="col-2">
            <ul>
                <li>
                    <h2>{product.name || <Skeleton/>}</h2>
                </li>
                <li>
                    <Ratings rating={product.rating} numReviews={product.numReviews}/>
                </li>
                <li>Price: ${product.price || <Skeleton/>}</li>
                <li>
                    <p>Description:{product.description || <Skeleton/>}</p>
                </li>
            </ul>
        </div>
        <div className="col-2">
          <div className="card product-info">
              <ul>
                <li>
                  <Ratings rating={product.rating}numReviews={product.numReviews}/>
                </li>
                <li>
                      <div className="row">
                      
                        <div>Price</div>
                        <div className="price">${product.price}</div>
                    </div>
                </li>
                <li>
                    <div className="row">
                      <div>Status</div>
                          <div>
                              {product.countInStock > 0 ? (
                                <span className="success">In stock</span>
                              ): (
                                <span className="danger">Unavailable</span>
                              )}
                          </div>
                    </div>
                </li>
                {product.countInStock > 0 && (
                  <>
                
                  <li>
                    <div className="row">
                      <div>Qty</div>
                      <div>
                        <select value={qty} onChange={e=>setQty(e.target.value)}>
                        {
                        [...Array(product.countInStock).keys()].map(x=>(
                            <option key={x + 1} value={x + 1}>
                            {x + 1}
                            </option>
                          ))
                        }
                        </select>
                      </div>
                    </div>
                  </li>
                  
                  <li>
                  <button className="primary block" onClick={handleAddToCart}>Add to cart</button>
                </li>
                </>
                )}
                  
              </ul>
          </div>
        </div>
      </div>
      </>
     )
     }
 </div>
 
   
  )
}

export default ProductCard