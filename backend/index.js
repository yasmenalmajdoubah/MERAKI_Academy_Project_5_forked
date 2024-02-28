const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");
const {Server} =require ("socket.io")
const auth = require("./middlewares/auth");
const socketMiddleWare = require("./middlewares/check");
const messageHndler = require("./controllers/message");


const app = express();

app.use(express.json());
app.use(cors());

// ========== Routers ==============
const rolesRouter = require("./route/role");
const usersRouter = require("./route/user");
const postRouter = require("./route/post");
const jobsRouter = require("./route/job");
const commentRouter = require("./route/comment");
const chatRouter = require("./route/chat");

//========== Routers Endpoints =============
app.use("/roles", rolesRouter);
app.use("/users", usersRouter);
app.use("/posts", postRouter);
app.use("/jobs", jobsRouter);
app.use("/comments", commentRouter);
app.use("/chat", chatRouter);

//=========================
// * this for any wrong path
app.use("*", (req, res) => {
  res.status(404).json("No content on this URL");
});

const PORT = process.env.PORT || 5000;
const server =app.listen(PORT, () => {
  console.log(`Server run on http://localhost${PORT}`);
});
//==================================
const io = new Server (server, { cors: { origin: "*", 
methods:["GET", "POST"] },
 })//allow any one
 const clients={}
 io.use (auth)

io.on("connection", (socket) => {
  
  console.log(socket)
  console.log(`${socket.id} is connected`);
 console.log(socket.handshake.headers.user_id);
const user_id =socket.handshake.headers.user_id


socket.use (socketMiddleWare)
clients[user_id]={
  socket_id :socket.id,
  user_id
}

messageHndler(socket,io,clients)
socket.on("error",(error)=>{
  socket.emit("error",{error: error.message})
})




socket.on("disconnect",()=>{
  console.log(`${socket.id} is connected`) 
  for (const key in clients) {
    if (clients[key].socket_id===socket.id) {
      delete clients[key]
      
    }
  }
  console.log(clients);
})


})