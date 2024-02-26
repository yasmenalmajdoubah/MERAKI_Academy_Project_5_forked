const express = require("express");
const { createChat, getAllMessages } = require("../controllers/chat");
const { authentication } = require("../middlewares/authentication");

const chatRouter = express.Router();

chatRouter.post("/create", authentication, createChat);
chatRouter.get("/messages", authentication, getAllMessages);

module.exports = chatRouter;
