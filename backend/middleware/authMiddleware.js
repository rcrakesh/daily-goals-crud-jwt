const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
require('dotenv').config();

const protect = asyncHandler(async (req , res , next)=>{
   let token;

   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
        token = req.headers.authorization.split(' ')[1];
        
        if (!token) {
            throw new Error('Token missing');
        }
        const decoded = jwt.verify(token , process.env.JWT_SECRET); // to verify 
        
        req.user = await User.findById(decoded.id).select('-password');// get user from the token
        if (!req.user) {
            res.status(401);
            throw new Error('User not found');
        }
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        res.status(401);
        throw new Error('Not authorized, token failed');
    }
    
   }
   else {
    res.status(401);
    throw new Error('Not authorized, no token');
  };
});

module.exports= {protect}