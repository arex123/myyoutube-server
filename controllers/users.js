import { createError } from "../error.js"
import User from "../models/User.js"

export const updateUser =async (req,res,next)=>{
    console.log("method updateUser")
    if(req.params.id==req.user.id){

        try{
            // console.log("req body ",req.body)
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{
                new:true
            })
            
            res.status(200).json(updatedUser)
        }catch(e){
            next(e)
        }

    }else{
        return next(createError(403,"You can update only your account!"))
    }

}

export const deleteUser = (req,res,next)=>{
    console.log("testing routers")
}

export const getUser = (req,res,next)=>{
    console.log("testing routers")
}

export const subscribe = (req,res,next)=>{
    console.log("testing routers")
}

export const unSubscribe = (req,res,next)=>{
    console.log("testing routers")
}

export const like = (req,res,next)=>{
    console.log("testing routers")
}

export const dislike = (req,res,next)=>{
    console.log("testing routers")
}