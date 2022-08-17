import productTypes from "./productTypes"
import Axios from "axios"


export const fetchProductsRequest=()=>async(dispatch)=>{
    dispatch({
        type:productTypes.FETCH_PRODUCTS_REQUEST
    })
    try{
        const {data} =await Axios.get("/api/products");
        dispatch({
            type:productTypes.SET_PRODUCTS,
            payLoad:data
        })
        
    }catch(error){
        dispatch({
            type:productTypes.FETCH_PRODUCTS_FAIL,
            payLoad:error.message
        })
    }
};


export const fetchProductRequest =(productId)=>async(dispatch)=>{
    dispatch({
        type:productTypes.FETCH_PRODUCT_REQUEST,
        payLoad:productId,
    })
    try{
        const {data} = await Axios.get(`/api/products/${productId}`);
        dispatch({
            type:productTypes.SET_PRODUCT,
            payLoad:data,
        })
     
    }catch(err){
        dispatch({
            type:productTypes.FETCH_PRODUCT_FAIL,
            payLoad:err.response && err.response.data.message
             ? err.response.data.message 
             : err.message,
        })
    }
}