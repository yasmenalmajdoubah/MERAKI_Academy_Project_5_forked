const express = require("express");
const { createChat, getAllMessages } = require("../controllers/chat");
const authentication = require("../middlewares/authentication");

const chatRouter = express.Router();

// http://localhost:5000/chat/create
chatRouter.post("/create", authentication, createChat);

// http://localhost:5000/chat/messages/5
chatRouter.get("/messages/:to", authentication, getAllMessages);

module.exports = chatRouter;
