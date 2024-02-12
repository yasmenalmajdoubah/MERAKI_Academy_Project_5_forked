const express=require("express")
const authentication = require("../middlewares/authentication")
const { createNewComment } = require("../controllers/comment")
const commentRouter=express.Router()

commentRouter.post("/comment/:post_id",authentication,createNewComment)

module.exports=commentRouter