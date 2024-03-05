const express=require("express")
const authentication = require("../middlewares/authentication")
const { createNewComment, getCommentsByPost, updateCommentById, deleteCommentById } = require("../controllers/comment")
const commentRouter=express.Router()

https://workedin.onrender.com/comments/comment/3
commentRouter.post("/comment/:post_id",authentication,createNewComment)

//https://workedin.onrender.com/comments/comment/3
commentRouter.get("/comment/:post_id",getCommentsByPost)

//https://workedin.onrender.com/comments/comment/2
commentRouter.put("/comment/:comment_id",authentication,updateCommentById)

//https://workedin.onrender.com/comments/comment/3
commentRouter.delete("/comment/:comment_id",authentication,deleteCommentById)
module.exports=commentRouter