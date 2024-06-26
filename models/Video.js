import mongoose from "mongoose"

const VideoSchema = new mongoose.Schema({
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
    VideoUrl:{
        type:String,
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    tags:{
        type:[String],
        default:[]
    },
    likes:{
        type:[String],
        default:[]
    },
    dislikes:{
        type:[String],
        default:[]
    },
},{timestamps:true})

export default mongoose.model("Video",VideoSchema)