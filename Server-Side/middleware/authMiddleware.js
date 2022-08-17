import  jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {
  //request the jwt from the user browser
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
      if (err) {
        const error = err.message;
        res.json({ error });
      } else {
        console.log(decodedToken);
        next();
      }
    });
    
  } else {
    res.json("there is no token");
  }
};


//checking current user
const authCurrentUser=async(req,res,next)=>{
  //  const token =req.cookies.jwt;
   
  //  if(token){
  //    jwt.verify(token,process.env.JWT_KEY,(err,decodedToken)=>{
  //      if(err){
  //       const error = err.message;
  //       console.log(error)
  //       next()
  //      }else{
  //        console.log(decodedToken);
  //        const user = await authModel.findById(decodedToken.id)
  //        next()
  //        return user
  //      }
  //    })
  //  }else{
  //   next()
  //  }
}




export { requireAuth,authCurrentUser };
