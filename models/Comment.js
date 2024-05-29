import mongoose from "mongoose"

const CommentSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    Title:{
        type:String,
        required:true
    },
    Desc:{
        type:String,
        required:true
    },
    
},{timestamps:true})

export default mongoose.model("Comment",CommentSchema)