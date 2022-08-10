import express from "express";
import {data} from '../data/ProductData.js'
import asyncHandler from "express-async-handler"
import productModel from "../models/productModel.js";

const router = express.Router();


router.get("/",  asyncHandler(async(req, res) => {
    const products=await productModel.find({});
    res.send(products)
}));


router.get("/seed",asyncHandler(async(req,res)=>{
      // await productModel.remove({});
  const createdProduct = await productModel.insertMany(data.products)
  res.send({createdProduct})
}))


router.get("/:id",asyncHandler(async(req, res) => {
  const product = await productModel.findById(req.params.id)
  if(product){
    res.send(product)
  }else{
    res.status(404).send({message:"Product Not Found"})
  }
}));

export default router;
