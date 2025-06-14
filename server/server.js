import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";


// app config
const PORT = process.env.PORT || 4000; 
const app = express();
await connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// api routes
app.get("/", (req, res) => {
  res.send("Working");
});

app.listen(PORT, () => {
  console.log("server is runing on port : ", PORT);
});
