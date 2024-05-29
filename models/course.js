import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  courseId:{
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  completedStatus: {
    type: String,
    required: true,
  },
  dateStarted: {
    type: Date,
  },
  location: {
    type: String,
    // required:true
  },
  thumbnail: {
    type: String,
    required: true,
  },
  section: {
    type: String,
  },
  items:{
    type:Object,
    required:true
  },
  date: { type: Date, default: Date.now },
});

const CourseModel = mongoose.model("Course", CourseSchema);
export default CourseModel;
