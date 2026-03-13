const jwt =require('jsonwebtoken');
const User = require('../models/User');


const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:'7d'
    })
}

const registerUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body

        if(!name || !email || !password){
            return res.status(400).json({message:"Please fill all the fields"})
    }
    const userExists = await User.findOne({email})

    if(userExists){
        return res.status(400).json({message:"User already exists"})
    }

    const user = await new User({
        name,
        email,
        password
    }).save()
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        token:generateToken(user._id)
    })
}
catch(error){
        console.error('Register error:', error)
        res.status(500).json({message:error.message || "Server error"})
    }
}

const loginUser = async(req,res ,next)=>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})

        if(user && (await user.matchPassword(password))){
            return res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id)
            })
        }
        res.status(401).json({message:"Invalid email or password"})
            
    }
    catch(error){
        res.status(500).json({message:"Server error"})
        next(error)
    }
}

const getMe = async(req,res)=>{
    try{
        res.json(req.user)
    }
    catch(error){
        res.status(500).json({message:"Server error"})
        next(error)
    }
}

module.exports = {registerUser, loginUser, getMe}