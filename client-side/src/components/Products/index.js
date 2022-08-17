import React,{useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux"
import Product from "./Product/index"
import {fetchProductsRequest} from "../Redux/Reducers/productReducer/productActions"
import "./index.css"
import CardSkeleton from '../CardSkeleton'
import MessageBox from "../MessageBox/index"

const mapState=({productsData})=>({
  products:productsData.products,
  loading:productsData.loading,
  error:productsData.error,
})

const Products = () => {
  const {products,loading,error}=useSelector(mapState)
  const dispatch=useDispatch()

  
  useEffect(()=>{
   dispatch(fetchProductsRequest())
  },[])
  
  return (
    <div className="main">
     
       {loading ? 
        <div className="row center">
        <CardSkeleton cards={8}/>
        </div>
        :
        error ?<MessageBox variant="danger">{error}</MessageBox>
        :(
          <div className="row center">
          <div className="wrapper">
          {products.map(product=>(
      <Product key={product._id}  product={product}/>
     )
    )}
            </div>
            </div>
        )
        }
    </div>
  
  )
}

export default Products
