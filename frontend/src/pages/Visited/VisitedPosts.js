
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import {
  allPost,
  allComments,
  addComment,
} from "../../service/redux/reducers/posts/postsSlice";
import { useParams } from "react-router";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import PostLoader from "../../components/PostsLoader/PostLoader";

export const VisitedPosts = () => {
  const {id}=useParams()
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [post_id, setPost_id] = useState("");
  const [show, setShow] = useState("");
  const [commentWind, setCommentWind] = useState(false);
  const [interested, setInterested] = useState(false);
  const [noPosts, setNoPosts] = useState(false);
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.log.token,
      postURL: state.posts.postURL,
      posts: state.posts.posts,
    };
  });
  // ===============================
  useEffect(() => {

    axios
      .get(`http://localhost:5000/posts/search_1?user=${id}`, {
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

  
  /* const handleUpdateClick = (post) => {
    
    setPost_id(post.post_id);
    
   

  } */


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
        dispatch(addComment({ newCommet, post_id }));
        //getCommentsByPost(post_id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ================================
  return (
    <div className=" rounded-2xl mt-5 ml-3 ">
      {state.posts.length !== 0 ? (
        state.posts?.map((post, index) => {
          return (
            <div key={post.post_id} className="  ">
              <div className=" container mt-3 relative "
              style={{ width: "750px" }}>
                <div
                  className="bg-white rounded-2xl shadow p-4"
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
                      <div className="flex items-center cursor-pointe">
                        <div className="mt-1 me-1" onClick={() => {}}>
                          {" "}
                          <FaHeart />
                        </div>
                        <div>Interested</div>
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
                      <>
                        {" "}
                        <div id="myModal" className="modal2">
                          <div className="modal-content2 ml-10">
                            <span
                              className="close2"
                              onClick={() => {
                                setCommentWind(false);
                              }}
                            >
                              &times;
                            </span>
                            <p>Commets</p>
                            <div>
                              {post.comments?.map((comment, i) => {
                                return (
                                  <div className="mb-3 border-b-2">
                                    <div className="flex items-center ms-2 mt-2">
                                      <img
                                        src={comment.profileimage}
                                        alt="Profile Picture"
                                        className="w-10 h-10 rounded-full object-cover"
                                      />
                                      <div className="ml-2">
                                        <p className="font-semibold">
                                          {comment.firstname} {comment.lastname}
                                        </p>
                                      </div>
                                    </div>
                                    <p className="comment ms-12 pb-2" key={i}>
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
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : noPosts ? (
        <div
          className="flex h-64 items-center justify-center"
          style={{ width: "650px" }}
        >
          <div className="text-gray-500 text-2xl">"No Posts Yet"</div>
        </div>
      ) : (
        <PostLoader />
      )}
    </div>
   
  );
}
