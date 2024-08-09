const User = require('../models/user')
const bcrypt = require('bcrypt')




const home = async (req, res) => {
    try {
        res
            .status(200)
            .send("hi")
    } catch (error) {
        console.log('error')
    }
}
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const userExist = await User.findOne({ email })

        if (userExist) {
            return res.status(400)
                .json({ message: 'email already exist' })
        }

        const userCreated = await User.create({ name, email, password });
        res.status(201)
            .json({
                message: "registration successful",
                token: await userCreated.generateToken(),
                userId: userCreated._id.toString()
            });
    } catch (error) {
       next(error)
    }
}

//user login
const login =async (req,res)=>{
    try {
        const {email,password}=req.body;
        const userExist=await User.findOne({email})
        if(!userExist){
            return res.status(400).json({message:'Invalid User'})
        }
        const user=await bcrypt.compare(password,userExist.password)
        
        if(user){
            res.status(200).json({
                message:"login successful",
                token:await userExist.generateToken(),
                userId:userExist._id.token
            })
        }
        else{
            res.status(401).json({message:'invalid email and password'})
        }
    } catch (error) {
       // res.status(500).json("internal server error")
       next(error)
    }
}

const user=async(req,res)=>{
    try {
        const userData=req.user;
      //  console.log(userData)
        return res.status(200).json({userData});
    } catch (error) {
        console.log(`error from the route ${error}`)
    }
}


module.exports = { home, register ,login,user }