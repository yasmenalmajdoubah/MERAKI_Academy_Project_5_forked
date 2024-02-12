const express=require("express")
const authentication = require("../middlewares/authentication")
const { createNewComment, getCommentsByPost } = require("../controllers/comment")
const commentRouter=express.Router()

commentRouter.post("/comment/:post_id",authentication,createNewComment)
commentRouter.get("/comment/:post_id",authentication,getCommentsByPost)
module.exports=commentRouter