import express from "express";
import connectDB from "./config/db.js";
import CourseModel from "./models/course.js";
const app = express();
app.use(express.json({ limit: "500kb" }));
app.use(express.urlencoded());
import cors from "cors";
app.use(cors());
import { config } from "dotenv";
config();
connectDB();
import userRoutes from './routes/users.js'
import videosRoutes from './routes/videos.js'
import commentRoutes from './routes/comments.js'
import authRoutes from './routes/auth.js'
import cookieParser from 'cookie-parser'

console.log("18")

app.use(cookieParser())
app.use(express.json())
app.use("/api/users",userRoutes)
app.use("/api/videos",videosRoutes)
app.use("/api/comments",commentRoutes)
app.use("/api/auth",authRoutes)


//error Middleware
app.use((err,req,res,next)=>{
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    succcess:false,
    status,
    message
  })
})



app.get("/", (req, res) => {
  console.log("hello");
});

//get all courses
app.get("/mycourse", async (req, res) => {
  try {
    let courses = await CourseModel.find();
    res.json(courses);
  } catch (e) {
    res.json({
      error: e.name + " : " + e.message + " : " + e.stack,
    });
  }
});
app.get("/findcourse/:id", async (req, res) => {
  const courseId = req.params.id;
  console.log("course id ", courseId);
  try {
    let course = await CourseModel.findOne({ courseId: courseId });
    if (!course) {
      return res.status(404).json({ found: false });
    }
    res.json({ found: true });
  } catch (e) {
    console.error("Error getting course by ID:", e);
    res.status(500).json({ message: "Server Error" });
  }
});
app.get("/mycourse/:id", async (req, res) => {
  const courseId = req.params.id;

  try {
    let course = await CourseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (e) {
    console.error("Error getting course by ID:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

//add course in all courses
app.post("/addCourse", async (req, res) => {
  // console.log(
  //   "Req body ",
  //   JSON.stringify(req.body),
  //   process.env.REACT_APP_API_KEY2
  // );

  try{

  
  let course = req.body.course;
  let courseId = course.id.playlistId;
  let playlistUrl =
    "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50" +
    "&playlistId=" +
    courseId +
    "&key=" +
    process.env.REACT_APP_API_KEY2;
  let data = await fetch(playlistUrl);
  let json = await data.json();
  // console.log("json data: ", JSON.stringify(json));

  let t_res =  Math.ceil(json.pageInfo.totalResults/50)-1
  let AllVideos = []
  console.log("json.items:",json.items.length)
  AllVideos = AllVideos.concat(json.items)
  while(t_res>0){

    let pageToken = json.nextPageToken

    console.log("calling")
    playlistUrl = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&pageToken="+pageToken+"&playlistId="+courseId+"&key="+process.env.REACT_APP_API_KEY2;
    data = await fetch(playlistUrl);
    json = await data.json();
    console.log("json.items:",json.items.length)
    AllVideos=AllVideos.concat(json.items)
    t_res=t_res-1
  }

  console.log("All videos ",AllVideos)




  // let a = {
  //   course: {
  //     kind: "youtube#searchResult",
  //     etag: "61V67y3y4sYB17bdqhuCQokyAko",
  //     id: {
  //       kind: "youtube#playlist",
  //       playlistId: "PLu0W_9lII9ahR1blWXxgSlL4y9iQBnLpR",
  //     },
  //     snippet: {
  //       publishedAt: "2022-07-14T12:51:40Z",
  //       channelId: "UCeVMnSShP_Iviwkknt83cww",
  //       title: "JavaScript Tutorials for Beginners in Hindi",
  //       description:
  //         "JavaScript Course in Hindi: This Javascript tutorial in Hindi course is designed for beginners with an aim to take JavaScript/ES6 ...",
  //       thumbnails: {
  //         default: {
  //           url: "https://i.ytimg.com/vi/ER9SspLe4Hg/default.jpg",
  //           width: 120,
  //           height: 90,
  //         },
  //         medium: {
  //           url: "https://i.ytimg.com/vi/ER9SspLe4Hg/mqdefault.jpg",
  //           width: 320,
  //           height: 180,
  //         },
  //         high: {
  //           url: "https://i.ytimg.com/vi/ER9SspLe4Hg/hqdefault.jpg",
  //           width: 480,
  //           height: 360,
  //         },
  //       },
  //       channelTitle: "CodeWithHarry",
  //       liveBroadcastContent: "none",
  //       publishTime: "2022-07-14T12:51:40Z",
  //     },
  //   },
  // };
  let newCourse = new CourseModel({
    title: course.snippet.title,
    courseId: courseId,
    link: courseId,
    length: json.pageInfo.totalResults,
    completedStatus: "0",
    dateStarted: Date.now(),
    location: "",
    thumbnail: course.snippet.thumbnails.high.url,
    section: "",
    items: AllVideos,
  });

  await newCourse.save()

  res.json({saved:true})

}
catch(e){
  console.log("e ",e)
  res.json({saved:false})

}
  // const newData = await data.json()
  // const newCourse = new CourseModel(req.body);
  // try {
  //   await newCourse.save();
  //   res.json({
  //     status: "successfull",
  //   });
  // } catch (e) {
  //   res.json({
  //     status: "failed",
  //     message: e,
  //   });
  // }
});
app.post("/removeCourse", async (req, res) => {
  console.log("removing course body ", req.body);

  let courseId = req.body.courseId
  console.log(courseId)


  try {
    
  let result  = await CourseModel.deleteOne({courseId:courseId})
  console.log(result)
    if (result.deletedCount === 1) {
      console.log("User deleted successfully!");
      res.json({removed:true})
    } else {
      console.log("No user found with that ID.");
      res.json({removed:false})
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.json({removed:false})
  }

  // const newCourse = new CourseModel(req.body);
  // try {
  //   await newCourse.save();
  //   res.json({
  //     status: "successfull",
  //   });
  // } catch (e) {
  //   res.json({
  //     status: "failed",
  //     message: e,
  //   });
  // }

});

const port = 1231;
app.listen(port, () => {
  console.log(`server started at ${port}`);
});
