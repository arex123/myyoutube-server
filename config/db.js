
// blog_app/config/db.js

import mongoose from "mongoose";

export default function connectDB() {
  //SNazet6PiCDcvscT
 
  try {
    mongoose.connect(process.env.Mongodb_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${process.env.Mongodb_url}`);
  });

  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
}
