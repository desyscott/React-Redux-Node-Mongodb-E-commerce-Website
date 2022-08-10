import mongoose from 'mongoose'


const productSchema = new mongoose.Schema({
  image:{
        type:String,
        required:true,
       
    },
    name:{   
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    numReviews:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    countInStock:{
        type:Number,
        required:true,
    },

    
},{timestamps:true})


export default mongoose.model("products",productSchema)