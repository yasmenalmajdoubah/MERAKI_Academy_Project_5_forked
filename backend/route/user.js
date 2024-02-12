const express = require("express");


const { register ,login,createNewFollow ,getAllUsersByField,getAllFollowersByUserId ,getUserById,unFollow} = require("../controllers/user");

const usersRouter = express.Router();

usersRouter.post("/register", register);

usersRouter.post("/login", login);

usersRouter.post("/follows", createNewFollow);

usersRouter.get("/search_2/:id", getAllUsersByField);

usersRouter.get("/:id", getUserById);

usersRouter.get("/follows/:id", getAllFollowersByUserId);

usersRouter.delete("/follows/:id", unFollow);

module.exports = usersRouter;
