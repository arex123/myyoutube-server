import express from 'express'
import { signin, signup } from '../controllers/auth.js'
const router = express.Router()

//creating a user
router.post("/signup",signup)

//signing in
router.post("/signin",signin)

//google authentication
router.post("/google",)

export default router