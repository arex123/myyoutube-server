import express from 'express'
import { deleteUser, dislike, getUser, like, subscribe, unSubscribe, updateUser } from '../controllers/users.js'
import { verifyToken } from '../verifyToken.js'
const router = express.Router()
console.log("5")
//update user
router.put("/:id",verifyToken,updateUser)

//delete user
router.delete("/:id",deleteUser)

//get a user
router.get("/find/:id",getUser)

//subscribe a user
router.put("/sub/:id",subscribe) //id will be the channel id which we want to subscribe

//unsubscribe a user
router.put("/unsub/:id",unSubscribe) //id will be the channel id which we want to subscribe

//like a video
router.put("/like/:videoId",like)

//dislike a video
router.put("/dislike/:videoId",dislike)

export default router