const mongoose=require("mongoose");

const transactionModel = new mongoose.Schema({
   text:{
       type:String,
    required:true 
},
   Amount:{
       type:Number,
    required:true 
},
 
  CreatedAt:{
      type:Date,
      default:Date.now
        
}


})

module.exports=mongoose.model("Users",transactionModel);