const express = require("express");

const { register ,login,createNewFollow ,getAllUsersByField} = require("../controllers/user");


const usersRouter = express.Router();

usersRouter.post("/register", register);

usersRouter.post("/login", login);

usersRouter.post("/follows", createNewFollow);

usersRouter.get("/search_2/:id", getAllUsersByField);


module.exports = usersRouter;
