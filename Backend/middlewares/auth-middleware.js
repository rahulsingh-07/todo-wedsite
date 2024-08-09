const jwt=require("jsonwebtoken")
const User=require('../models/user')
const authMiddleware=async(req,res,next)=>{
    const token=req.header("Authorization");
    if(!token){
        return res 
        .status(401) 
        .json({message:"Unauthorized HTTP, Token not provided"})
    }
    //console.log("token auth",token)
    const jwtToken=token.replace("Bearer","").trim();
   // console.log("token from auth middleware",jwtToken)

    try {
        const isVerified=jwt.verify(jwtToken,process.env.JWT_SECRET)
        const userData=await User.findOne({email:isVerified.email})
        console.log(userData)
        req.user=userData;
        req.token=token
        next()
    } catch (error) {
        return res.status(401).json({message:"Unauthorized. Invalid token"})
    }
}

module.exports=authMiddleware;