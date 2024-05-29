
// blog_app/config/db.js

import mongoose from "mongoose";

export default function connectDB() {
  //SNazet6PiCDcvscT
  let url = "mongodb+srv://user_1122:SNazet6PiCDcvscT@cluster0.t6fnq8q.mongodb.net/db"

  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
}
