const express=require("express")
const { createNewPost } = require("../controllers/post")
const {authentication}=require("../middlewares/authentication")
const {authorization}=require("../middlewares/authorization")
const postRouter=express.Router()



postRouter.post("/create",authentication,authorization("CREATE_POST"),createNewPost)




module.exports=postRouter