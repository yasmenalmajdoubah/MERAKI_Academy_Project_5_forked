const express = require("express");

const { register ,login,createNewFollow} = require("../controllers/user");

const usersRouter = express.Router();
usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.post("/follows", createNewFollow);

module.exports = usersRouter;