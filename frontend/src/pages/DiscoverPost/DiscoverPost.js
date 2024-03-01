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
const pic = require("../../assest/Screenshot_1.png");
const pic_2 = require("../../assest/3.png");
const pic_3 = require("../../assest/w3_1.png");

const Global = () => {
  const [comment, setComment] = useState(""); //
  const [message, setMessage] = useState("");
  const [post_id, setPost_id] = useState("");
  const [likes, setLikes] = useState(false);
  const [show, setShow] = useState("");
  const [commentWind, setCommentWind] = useState(false);
  const [interested, setInterested] = useState(false);
  const [noPosts, setNoPosts] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => {
    return {
      token: state.log.token,
      postURL: state.posts.postURL,
      posts: state.posts.posts,
      userLikes: state.posts.userLikes,
      userId: state.log.userId,
    };
  });

  // ====================================================================
  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/search_2`, {
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

  // ====================================================================
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

  // ====================================================================
  return (
    <div className=" flex flex-row justify-center space-x-20 bg-zinc-200 mt-5">
      <div>
        {state.posts.length !== 0 ? (
          state.posts?.map((post, index) => {
            return (
              <div key={post.post_id} className="flex justify-center">
                <div className=" mt-3" style={{ width: "650px" }}>
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
                          className="mt-4 object-cover "
                        />
                      )}
                    </div>

                    <div className="items-center mt-4 pt-2 border-t-2">
                      <div className="flex justify-around">
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
                          <div id="myModal" class="modal2">
                            <div className="modal-content2">
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
                                            {comment.firstname}{" "}
                                            {comment.lastname}
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
                              <div className="mt-4"></div>
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
          <div className="flex justify-center">
            {" "}
            <PostLoader />
          </div>
        )}
      </div>
      {/* ********************** side Ads ******************************** */}
      <div>
        <div className="mt-5 border-2  p-2 pt-0 border-gray-400">
          <p className="flex justify-center text-sm">Ads</p>
          {state.userId === 42 ? (
            <img src={pic} />
          ) : state.userId === 48 ? (
            <img src={pic_2} />
          ) : (
            <img src={pic_3} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Global;
