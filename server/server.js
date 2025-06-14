const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");
const dotenv = require("dotenv");
const userRouter = require("./routes/UserRoutes");

// app config
dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();
connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// api routes
app.get("/", (req, res) => {
  res.send("Working");
});

app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log("server is runing on port : ", PORT);
});
