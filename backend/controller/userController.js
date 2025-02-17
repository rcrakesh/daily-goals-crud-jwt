const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
require('dotenv').config();

const User = require('../models/userModel');



const registerUser = asyncHandler(async(req , res)=>{
    const { name , email , password } = req.body

    if(!name || !email || !password){
        res.status(400).json({message : 'Please fill in all fields'})
    }
    const userExists = await User.findOne({email}) // check the exists user 

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password , salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token : generateToken(user._id),
        })
    }   else{
        res.status(400).json({message : 'Invalid user data'})
    }

   
})

const loginUser = asyncHandler(async (req , res)=>{
    const {email , password} = req.body

    const user = await User.findOne({email})// check the eamil
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id),
        })
    }else{
        res.status(401).json({message : 'Invalid credentials'})
    }

   
})

const getMe = asyncHandler(async(req , res)=>{
    const { _id , name, email} = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name,
        email,
    })
    // res.json({message : 'User data display '})

})

const generateToken = (id)=>{
    return jwt.sign({id} , process.env.JWT_SECRET , {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}