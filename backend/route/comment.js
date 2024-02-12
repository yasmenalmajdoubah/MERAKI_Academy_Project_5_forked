const express=require("express")
const authentication = require("../middlewares/authentication")
const { createNewComment, getCommentsByPost, updateCommentById, deleteCommentById } = require("../controllers/comment")
const commentRouter=express.Router()

commentRouter.post("/comment/:post_id",authentication,createNewComment)
commentRouter.get("/comment/:post_id",authentication,getCommentsByPost)
commentRouter.put("/comment/:comment_id",authentication,updateCommentById)
commentRouter.delete("/comment/comment_id",authentication,deleteCommentById)
module.exports=commentRouter