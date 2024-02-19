import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import {
  allPost,
  allComments,
  addComment,
} from "../../service/redux/reducers/posts/postsSlice";

export const Post = () => {
  const [comment, setComment] = useState(""); //
  const [message, setMessage] = useState("");
  const [post_id, setPost_id] = useState(false);
  const [show, setShow] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.log.token,
      postURL: state.posts.postURL,
      posts: state.posts.posts,
    };
  });
  console.log(state.posts);
  // ===============================
  useEffect(() => {
    axios
      .get("http://localhost:5000/posts/followsPosts", {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        dispatch(allPost(result.data.posts));
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  /*
  const handleUpdateClick = (post) => {
    
    setPost_id(post.post_id);
    
   

  }

*/
  ///get comments
  const getCommentsByPost = async (post_id) => {
    try {
      const result = await axios.get(
        `http://localhost:5000/comments/comment/${post_id}`
      );
      if (result.data.success) {
        const comments = result.data.result;
        console.log(result.data);
        dispatch(allComments({ comments, post_id }));
      } else throw Error;
    } catch (error) {
      if (!error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  const createComment = async (post_id) => {
    try {
      const result = await axios.post(
        `http://localhost:5000/comments/comment/${post_id}`,
        {
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      if (result.data.success) {
        const newCommet = result.data.result
        dispatch(addComment({ newCommet, post_id }))
        getCommentsByPost(post_id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ================================
  return (
    <div>
      {/* <form className="posts-form"> */}
      {state.posts?.map((post, index) => {
        return (
          <div class="bg-gray-100">
          <div class="max-w-xl mx-auto p-4">
            <div class="bg-white rounded-lg shadow">
              <div class="flex p-4">
                <img src ={post.profileimage} alt="Profile Picture" class="w-12 h-12 rounded-full"/>
                <div class="ml-3">
                  <h3 class="text-lg font-semibold"> {post.firstname}  {post.lastname}</h3>
                  <p class="text-sm text-gray-600">Posted  {post.created_at
           }</p>
                </div>
              </div>
              <div class="px-4 py-2">
                <p class="text-lg">{post.body}</p>
              </div>
              <img src={post.image} alt="Post Image" class="w-full"/>
              <div class="flex p-4">
                <div class="flex items-center mr-4">
                  <svg class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="ml-1 text-gray-600">Like</span>
                </div>
                <div class="flex items-center">
                  <svg class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 9l-7 7-7-7"></path>
                  </svg>
                  <span class="ml-1 text-gray-600">Comment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
      })}

      {/* </form> */}
    </div>
  );
};
/*
<div class="bg-gray-100">
  <div class="max-w-xl mx-auto p-4">
    <div class="bg-white rounded-lg shadow">
      <div class="flex p-4">
        <img src ={post.profileimage} alt="Profile Picture" class="w-12 h-12 rounded-full">
        <div class="ml-3">
          <h3 class="text-lg font-semibold"> {post.firstname}  {post.lastname}</h3>
          <p class="text-sm text-gray-600">Posted  {post.created_at
   }</p>
        </div>
      </div>
      <div class="px-4 py-2">
        <p class="text-lg">{post.body}</p>
      </div>
      <img src={post.image} alt="Post Image" class="w-full">
      <div class="flex p-4">
        <div class="flex items-center mr-4">
          <svg class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 13l4 4L19 7"></path>
          </svg>
          <span class="ml-1 text-gray-600">Like</span>
        </div>
        <div class="flex items-center">
          <svg class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 9l-7 7-7-7"></path>
          </svg>
          <span class="ml-1 text-gray-600">Comment</span>
        </div>
      </div>
    </div>
  </div>
</div>

*/

export default Post;
