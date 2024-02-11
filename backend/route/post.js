const express=require("express")
const { createNewPost, getPostsByUser } = require("../controllers/post")
const authentication=require("../middlewares/authentication")
const authorization=require("../middlewares/authorization")
const postRouter=express.Router()



postRouter.post("/create",authentication,authorization("CREATE_POST"),createNewPost)
postRouter.get("/post/search_1",authentication,getPostsByUser)



module.exports=postRouter