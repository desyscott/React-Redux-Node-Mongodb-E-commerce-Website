import jwt from "jsonwebtoken"

// create json web token which expire in 3 days
const maxAge= 3*24*60*60;

export const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_KEY,{
        expiresIn: maxAge,
    })
}
