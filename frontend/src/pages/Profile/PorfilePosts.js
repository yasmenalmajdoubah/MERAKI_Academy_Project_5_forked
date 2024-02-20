import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import {
  allPost,
  allComments,
  addComment,
} from "../../service/redux/reducers/posts/postsSlice";
import { IoIosCloseCircle } from "react-icons/io";

const PorfilePosts = () => {
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
      userId: state.log.userId,
    };
  });
  // ===============================
  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/search_1?user=${state.userId}`, {
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

  /* ===================================================== */
  ///get comments

  const getCommentsByPost = async (post_id) => {
    console.log(post_id);
    try {
      const result = await axios.get(
        `http://localhost:5000/comments/comment/${post_id}`
      );
      if (result.data.success) {
        console.log("result.data", result.data);
        const comments = result.data.comments;
        console.log("comments", comments);
        dispatch(allComments({ comments, post_id }));
      } else throw Error;
    } catch (error) {
      if (!error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  /* ================================================== */
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
        // getCommentsByPost()
        console.log("result.data", result.data);
        const newCommet = result.data.results;
        console.log("123", newCommet);
        dispatch(addComment({ newCommet, post_id }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* ================================================= */
  return (
    <div className="bg-zinc-100">
      {state.posts?.map((post, index) => {
        return (
          <div key={post_id} className="relative">
            <div className="container mx-auto p-3" style={{ width: "650px" }}>
              <div
                className="bg-white rounded-lg shadow p-4"
                style={{ width: "650px" }}
              >
                <div className="flex items-center">
                  <img
                    src={post.profileimage}
                    alt="Profile Picture"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-2">
                    <p className="font-semibold">
                      {post.firstname} {post.lastname}
                    </p>
                    <p class="text-gray-500 text-xs">
                      {" "}
                      Posted{" "}
                      {post.created_at
                        .split("T")
                        .shift()
                        .split("-")
                        .reverse()
                        .join("-")}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p>{post.body}</p>
                  {post.image && (
                    <img src={post.image} alt="Post Image" className="mt-4" />
                  )}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <button
                    id="like-button"
                    class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                  >
                    LIKE
                  </button>
                  <button
                    id="comment-button"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      console.log(post);
                      getCommentsByPost(post.post_id);
                      setShow(post.post_id);
                    }}
                  >
                    COMMENT
                  </button>
                  {/* ========== */}
                  <div className="bg-white absolute top-12 left-52 w-96 h-auto">
                    <div className="flex justify-between">
                      <p className="text-center">Commets</p>
                      <div>
                        <IoIosCloseCircle />
                      </div>
                    </div>
                    <div>
                      {post.comments?.map((comment, i) => {
                        return (
                          <div className="mb-3 border-t-2">
                            <div className="flex items-center ms-2 mt-2">
                              <img
                                src={comment.profileimage}
                                alt="Profile Picture"
                                className="w-10 h-10 rounded-full"
                              />
                              <div className="ml-2">
                                <p className="font-semibold">
                                  {comment.firstname} {comment.lastname}
                                </p>
                              </div>
                            </div>
                            <p className="comment ms-12" key={i}>
                              {comment.comment}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <div class="mt-4">
                      <textarea
                        id="comment-textarea"
                        className="w-96 h-18 p-1 bg-gray-200 rounded"
                        placeholder="Write a comment"
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                      ></textarea>
                      <button
                        id="post-comment-button"
                        class="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          if (comment) createComment(post.post_id);
                        }}
                      >
                        Add Comment
                      </button>
                    </div>
                  </div>
                </div>
                <div class="comment-section mt-4">
                  <div class="bg-white rounded-lg shadow p-4"></div>
                </div>
                <div class="mt-4">
                  <textarea
                    id="comment-textarea"
                    class="w-full h-32 p-2 bg-gray-200 rounded"
                    placeholder="WRITE YOUR COMMENT HERE"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  ></textarea>
                  <button
                    id="post-comment-button"
                    class="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      if (comment) createComment(post.post_id);
                    }}
                  >
                    COMMENT
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PorfilePosts;
