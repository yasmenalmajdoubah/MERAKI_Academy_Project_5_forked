const express = require("express");
const postRouter = express.Router();

const {
  createNewPost,
  getPostsByUser,
  getPostsByField,
  updatePostById,
  deletePostById,
  addLike,
  getLikesByPost,
  deleteLike,
} = require("../controllers/post");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

// http://localhost:5000/posts/create
postRouter.post(
  "/create",
  authentication,
  authorization("CREATE_POST"),
  createNewPost
);

// http://localhost:5000/posts/search_1?user=4
postRouter.get("/search_1", getPostsByUser);

// http://localhost:5000/posts/search_2
postRouter.get("/search_2", authentication, getPostsByField);

// http://localhost:5000/posts/update/3
postRouter.put("/update/:post_id", updatePostById);

// http://localhost:5000/posts/delete/3
postRouter.delete("/delete/:post_id", deletePostById);

// http://localhost:5000/posts/addLike
postRouter.post("/addLike", authentication, addLike);

// http://localhost:5000/posts/getLikes/1
postRouter.get("/getLikes/:post_id", getLikesByPost);

// http://localhost:5000/posts/removeLike/7
postRouter.delete("/removeLike/:like_id", deleteLike);

module.exports = postRouter;
