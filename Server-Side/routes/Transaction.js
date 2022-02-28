const express=require("express");
const router =express.Router()
const transactionModel=require("../models/TransactionModel")


router.get("/",(req,res)=>{
    res.send("transaction zone")
})


module.exports=router;