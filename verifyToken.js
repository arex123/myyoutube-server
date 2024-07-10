import jwt from 'jsonwebtoken'
import {createError} from './error.js'

export const verifyToken = (req,res,next)=>{
    console.log("verifying token")
    const token = req.cookies.access_token;
    console.log("token ",token)

    if(!token) return next(createError(401,"You are not authenticated!"))

    jwt.verify(token,process.env.JWT,(error,user)=>{
        if(error) return next(createError(403,"Token is not valid!"))
        req.user = user
        next()
    })


}