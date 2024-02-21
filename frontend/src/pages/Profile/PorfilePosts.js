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
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";

// ========================================================
const PorfilePosts = () => {
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [post_id, setPost_id] = useState("");
  const [show, setShow] = useState("");
  const [commentWind, setCommentWind] = useState(false);
  const [interested, setInterested] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.log.token,
      postURL: state.posts.postURL,
      posts: state.posts.posts,
      userId: state.log.userId,
    };
  });

  // =====================================
  useEffect(() => {
    console.log(state.userId);
    axios
      .get(`http://localhost:5000/posts/search_1?user=${state.userId}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        dispatch(allPost(result.data.posts));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  /* ===================================================== */
  ///get comments

  const getCommentsByPost = async (post_id) => {
    try {
      const result = await axios.get(
        `http://localhost:5000/comments/comment/${post_id}`
      );
      if (result.data.success) {
        const comments = result.data.comments;
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
        const newCommet = result.data.results;
        dispatch(addComment({ newCommet, post_id }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  /* ================================================= */
  return (
    <div className="bg-zinc-100 ">
      {state.posts?.map((post, index) => {
        return (
          <div key={post.post_id} className="">
            <div
              className="container mx-auto p-3 relative"
              style={{ width: "650px" }}
            >
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
                    <p className="text-gray-500 text-xs">
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

                <div className="items-center mt-4 pt-2 border-t-2">
                  <div className="flex justify-around">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => {
                        setInterested(true);
                        setPost_id(post.post_id);
                      }}
                    >
                      <div
                        className={
                          interested && post_id === post.post_id
                            ? "text-red-800 me-1 mt-1"
                            : "text-grey-600 me-1 mt-1"
                        }
                      >
                        {" "}
                        <FaHeart />
                        {/* <FaRegHeart /> */}
                      </div>
                      <div
                        className={
                          interested && post_id === post.post_id
                            ? "text-red-800"
                            : "text-grey-600"
                        }
                      >
                        Interested
                      </div>
                    </div>

                    {/* ======*******===== */}

                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => {
                        getCommentsByPost(post.post_id);
                        setShow(post.post_id);
                        setCommentWind(true);
                        setPost_id(post.post_id);
                      }}
                    >
                      <div className="me-1 mt-1">
                        <TfiCommentAlt />
                      </div>
                      <div>Reviews</div>
                    </div>
                  </div>
                  {/* ========== */}
                  {commentWind && post_id === post.post_id && (
                    <div className="bg-white absolute bottom-32 left-52 w-96 h-auto rounded">
                      <div className="flex justify-between">
                        <p className="text-center mt-1 ms-1">Commets</p>
                        <div
                          className="mt-1 me-1"
                          onClick={() => {
                            setCommentWind(false);
                          }}
                        >
                          <IoIosCloseCircle />
                        </div>
                      </div>
                      <div>
                        {post.comments?.map((comment, i) => {
                          return (
                            <div className="mb-3 border-b-2">
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
                      <div className="mt-4">
                        <textarea
                          id="comment-textarea"
                          className="w-96 h-12 p-1 bg-gray-200 rounded-2xl"
                          placeholder="  Write a comment"
                          onChange={(e) => {
                            setComment(e.target.value);
                          }}
                        ></textarea>
                        <button
                          id="post-comment-button"
                          className="mt-2 ms-2 mb-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            if (comment) createComment(post.post_id);
                          }}
                        >
                          Add Comment
                        </button>
                      </div>
                    </div>
                  )}
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
