const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.authenticate = async(req,res,next)=>{
    try{

        const token = req.header('Authorization')
        const user = jwt.verify(token,process.env.secretToken)
        let userData = await User.findById(user.id)
        if(!userData){
            throw new Error("user does not exist")   
        }
        req.user = userData
        next()
        
    }catch(err){
        console.log("err ",err)
        return res.status(401).json({
            success:false
        })
    }
}