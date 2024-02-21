import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  allPost,
  allComments,
  addComment,
  allLikes,
  addLike,
  removeLike,
} from "../../service/redux/reducers/posts/postsSlice";
import { IoIosCloseCircle } from "react-icons/io";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";
import PostLoader from "../../components/PostsLoader/PostLoader";

export const Post = () => {
  const [comment, setComment] = useState(""); //
  const [message, setMessage] = useState("");
  const [post_id, setPost_id] = useState("");
  const [likes, setLikes] = useState(false);
  const [show, setShow] = useState("");
  const [commentWind, setCommentWind] = useState(false);
  const [interested, setInterested] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => {
    return {
      token: state.log.token,
      postURL: state.posts.postURL,
      posts: state.posts.posts,
    };
  });
  // console.log(state.posts);
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
        // console.log(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

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
        console.log("result.data", result.data);
        const newCommet = result.data.results;
        console.log("123", newCommet);
        dispatch(addComment({ newCommet, post_id }));
        //getCommentsByPost(post_id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* =============================== */
  const getlikes = async (post_id) => {
    //console.log("post_id")
    try {
      const result = await axios.get(
        `http://localhost:5000/posts/getLikes/${post_id}`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      if (result.data.success) {
        // console.log('result.data', result.data)
        const likes = result.data.likes;

        dispatch(allLikes({ likes, post_id }));
      } else throw Error;
    } catch (error) {
      if (!error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  /* ============================================== */

  const like = async (post_id) => {
    console.log("first", post_id);
    try {
      console.log("first", post_id);
      const result = await axios.post(
        `http://localhost:5000/posts/addLike`,
        {
          post_id,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      if (result.data.success) {
        setLikes(true);
        dispatch(addLike({ post_id }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* ============================================== */

  const unlike = async (like_id) => {
    console.log("first", like_id);
    try {
      console.log("first", like_id);
      const result = await axios.post(
        `http://localhost:5000/posts/removeLike/${like_id}`,

        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      if (result.data.success) {
        setLikes(true);
        dispatch(removeLike({ like_id }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(state.posts);
  // ================================

  return (
    <div className="bg-zinc-200">
      {state.posts.length === 0 ? (
        <PostLoader />
      ) : (
        state.posts?.map((post, index) => {
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
                      className="w-12 h-12 rounded-full cursor-pointer object-cover"
                      onClick={() => {
                        navigate(`/friend/${post.user_id}`);
                      }}
                    />
                    <div className="ml-2">
                      <p
                        className="font-semibold cursor-pointer"
                        onClick={() => {
                          navigate(`/friend/${post.user_id}`);
                        }}
                      >
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
                      <img
                        src={post.image}
                        alt="Post Image"
                        className="mt-4 object-cover"
                      />
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
        })
      )}
    </div>
  );

  /*(
    <div>
      {/* <form className="posts-form"> */ //}
  /*
      {state.posts?.map((post, index) => {
        return (
          <div class="bg-gray-100">
          <div class="container mx-auto p-9">
              <div class="bg-white rounded-lg shadow p-4">
                  <div class="flex items-center">
                      <img src ={post.profileimage} alt="Profile Picture" class="w-12 h-12 rounded-full"/>
                      <div class="ml-2">
                          <p class="font-semibold"onClick={()=>{navigate(`/friend/${post.user_id}`)}}>{post.firstname}  {post.lastname}</p>
                          <p class="text-gray-500 text-sm"> Posted  {post.created_at
                 }</p>
                      </div>
                  </div>
                  <div class="mt-4">
                      <p>{post.body}</p>
                      <img src={post.image} alt="Post Image" class="mt-4"/>
                  </div>
                  
                  <div class="flex items-center justify-between mt-4">
                      <button id="like-button" class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" 
                      onClick={() => {
                        console.log("post")
                        getlikes(post.post_id);
                        {likes?like (post.post_id):unlike(post.post_id)}
                       
                      }}
                      >LIKE</button>
                      <button id="comment-button" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                       onClick={() => {
                        console.log(post)
                        getCommentsByPost(post.post_id);
                        setShow(post.post_id);
                      }}
                      >COMMENT</button>
                  </div>
                  {post.comments?.map((comment, i) => {
                            console.log(comment)
              return (
                <p className="comment" key={i}>
                 
                  {comment.comment}
                </p>
              );
            })}
                  <div class="comment-section mt-4">
                      <div class="bg-white rounded-lg shadow p-4">
                          
                      </div>
                      
                  </div>
                  <div class="mt-4">
                      <textarea id="comment-textarea" class="w-full h-32 p-2 bg-gray-200 rounded" placeholder="WRITE YOUR COMMENT HERE"  onChange={(e) => {
                  setComment(e.target.value);
                 
                }}></textarea>
                      <button id="post-comment-button" class="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type ="reset" onClick={() => {
                  if (comment) createComment(post.post_id);
                  //document.textform.textarea.value=""
                  
                }}>COMMENT</button>
                  </div>
              </div>
          </div>
      </div>
        );
      })}

    
    </div>
  );*/
};

export default Post;
