const express = require("express");
const { createChat, getMyChats,getChatsByUser } = require("../controllers/chat");
const authentication = require("../middlewares/authentication");

const chatRouter = express.Router();

// http://localhost:5000/chat/create
chatRouter.post("/create", authentication, createChat);

// http://localhost:5000/chat/messages/all
chatRouter.get("/messages/all", authentication, getMyChats);

// http://localhost:5000/chat/messages/user/5
chatRouter.get("/messages/user/:to", authentication, getChatsByUser);


module.exports = chatRouter;
