const express = require("express");

const { register ,login,createNewFollow ,getAllUsersByField,getUserById} = require("../controllers/user");


const usersRouter = express.Router();

usersRouter.post("/register", register);

usersRouter.post("/login", login);

usersRouter.post("/follows", createNewFollow);

usersRouter.get("/search_2/:id", getAllUsersByField);
usersRouter.get("/:id", getUserById);


module.exports = usersRouter;
