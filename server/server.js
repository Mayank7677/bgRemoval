const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const userRouter = require("./routes/UserRoutes");
const imageRouter = require("./routes/ImageRoutes");

// app config
dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();
connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(fileUpload())


// api routes
app.get("/", (req, res) => {
  res.send("Working");
});

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

app.listen(PORT, () => {
  console.log("server is runing on port : ", PORT);
});
