const express = require("express");
const postRouter = express.Router();

const {
  createNewPost,
  getPostsMyFollows,
  getPostsByUser,
  getPostsByField,
  updatePostById,
  deletePostById,
  addLike,
  getLikesByPost,
  deleteLike,
  getAllLikedPostsByUser,
} = require("../controllers/post");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

// https://workedin.onrender.com/posts/create
postRouter.post(
  "/create",
  authentication,
  authorization("CREATE_POST"),
  createNewPost
);
// https://workedin.onrender.com/posts/allLikedPosts/user
postRouter.get("/allLikedPosts/user", authentication, getAllLikedPostsByUser);

// https://workedin.onrender.com/posts/followsPosts
postRouter.get("/followsPosts", authentication, getPostsMyFollows);

// https://workedin.onrender.com/posts/search_1?user=4
postRouter.get("/search_1", authentication, getPostsByUser);

// https://workedin.onrender.com/posts/search_2
postRouter.get("/search_2", authentication, getPostsByField);

// https://workedin.onrender.com/posts/update/3
postRouter.put("/update/:post_id", authentication, updatePostById);

// https://workedin.onrender.com/posts/delete/3
postRouter.delete("/delete/:post_id", authentication, deletePostById);

// https://workedin.onrender.com/posts/addLike
postRouter.post("/addLike", authentication, addLike);

// https://workedin.onrender.com/posts/getLikes/1
postRouter.get("/getLikes/:post_id", authentication, getLikesByPost);

// https://workedin.onrender.com/posts/removeLike/7
postRouter.delete("/removeLike/:like_id", authentication, deleteLike);

module.exports = postRouter;
