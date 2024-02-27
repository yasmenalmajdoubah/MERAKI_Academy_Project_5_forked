const express = require("express");
const {Server} =require ("socket.io")

const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();

app.use(express.json());
app.use(cors());



// ========== Routers ==============
const rolesRouter = require("./route/role");
const usersRouter = require("./route/user");
const postRouter=require("./route/post");
const jobsRouter = require("./route/job");
const commentRouter=require("./route/comment")

//========== Routers Endpoints =============
app.use("/roles", rolesRouter);
app.use("/users", usersRouter);
app.use("/posts",postRouter);
app.use("/jobs", jobsRouter);
app.use("/comments",commentRouter)

//=========================
// * this for any wrong path
app.use("*", (req, res) => {
  res.status(404).json("No content on this URL");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server run on http://localhost${PORT}`);
});
