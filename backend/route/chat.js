const express = require("express");
const { createChat, getMyChats,getChatsByUser } = require("../controllers/chat");
const authentication = require("../middlewares/authentication");

const chatRouter = express.Router();

// https://workedin.onrender.com/chat/create
chatRouter.post("/create", authentication, createChat);

// https://workedin.onrender.com/chat/messages/all
chatRouter.get("/messages/all", authentication, getMyChats);

// https://workedin.onrender.com/chat/messages/user/5
chatRouter.get("/messages/user/:to", authentication, getChatsByUser);


module.exports = chatRouter;
