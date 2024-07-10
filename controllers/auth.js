import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from 'jsonwebtoken'
import {createError} from '../error.js'
export const signup = async (req, res, next) => {
  console.log(req.body);

  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = await User({ ...req.body, password: hash });
    
    await newUser.save()
    res.status(200).send("User has been created")
  } catch (err) {
    next(err)
  }
};

export const signin = async(req,res,next)=>{
  console.log("loggin in")
  try{
    const user = await User.findOne({name:req.body.name})
    if(!user) return next(createError(404,"User not found!"))

    const isConnect = await bcrypt.compare(req.body.password, user.password)

    if(!isConnect) return next(createError(400,"Wrong Credentials!"))

    const token = jwt.sign({ id:user._id }, process.env.JWT )

    const {password, ...other} = user._doc
    res.cookie("access_token",token,{
      httpOnly:true
    }).status(200).json(other)

  }catch(e){
    next(e)
  }
}
