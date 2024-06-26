import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

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
