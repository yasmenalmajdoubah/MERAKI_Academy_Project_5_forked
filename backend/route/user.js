const express = require("express");

const { register, login ,getAllUsersByField} = require("../controllers/user");

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/search_2/:id", getAllUsersByField);

module.exports = usersRouter;
