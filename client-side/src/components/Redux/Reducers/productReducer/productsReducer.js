import productTypes from "./productTypes"

const INITIAL_STATE = {
    products:[],
    product:{},
    loading:true
}

const productsReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
       case productTypes.FETCH_PRODUCTS_REQUEST:
        return{
            ...state,
            loading:true,
        }
        
       case productTypes.SET_PRODUCTS: 
        return{
            ...state,
            products:action.payLoad,
            loading:false,
        }
        
       case productTypes.FETCH_PRODUCTS_FAIL:
        return{
            ...state,
            loading:false,
            error:action.payLoad
        }
        
      case productTypes.FETCH_PRODUCT_REQUEST:
      return{
          ...state,
          loading:true,
      }
      
      case productTypes.SET_PRODUCT:
      return{
        ...state,
        loading:false,
        product:action.payLoad
      }
      
      case productTypes.FETCH_PRODUCT_FAIL:
      return{
        ...state,
        loading:false,
       error:action.payLoad
      }
        
        default:return state
    }
    
}
export default productsReducer;