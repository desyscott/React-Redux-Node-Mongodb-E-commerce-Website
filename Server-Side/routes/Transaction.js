import express from ("express");

const router =express.Router()

const transactionModel=require("../models/TransactionModel.js")


router.get("/",(req,res)=>{
    res.send("transaction zone")
})


export {router};