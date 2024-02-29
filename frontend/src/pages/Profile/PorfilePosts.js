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
import { useNavigate } from "react-router-dom";
import PostLoader from "../../components/PostsLoader/PostLoader";
import { IoMdArrowDropup } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { RxUpdate } from "react-icons/rx";

// ========================================================
const PorfilePosts = () => {
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [post_id, setPost_id] = useState("");
  const [show, setShow] = useState("");
  const [commentWind, setCommentWind] = useState(false);
  const [interested, setInterested] = useState(false);
  const [noPosts, setNoPosts] = useState(false);
  const [deleteupdate, setDeleteupdate] = useState(false);
  const [postId, setPostId] = useState();
  const [deletePost, setDeletePost] = useState(false);
  const [updatePost, setUpdatePost] = useState(false)
  const [postBody, setPostBody] = useState("")
  const [postChange, setPostChange] = useState("")
  const navigate = useNavigate();
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
  const getPosts=()=>{
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
  }
  useEffect(() => {
   getPosts()
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
  const DaletePost = (id) => {
    axios
      .delete(`http://localhost:5000/posts/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        console.log("delete sucssses");
        getPosts()
      })
      .catch((err) => {
        console.log(err);
      });
      setDeleteupdate(false)
      setDeletePost(false)
  };
  const UpdatePost = (id) => {
    axios
      .put(`http://localhost:5000/posts/update/${id}`,{
        body : postChange
      }, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        console.log("update sucsses");
        getPosts()
      })
      .catch((err) => { console.log(err)});
      setDeleteupdate(false)
      setUpdatePost(false)

  };
  /* ================================================= */
  return (
    <div className="rounded-2xl mt-5 ml-3 " id="postProfile">
      {state.posts.length !== 0 ? (
        state.posts?.map((post, index) => {
          return (
            <div key={post.post_id} className="  ">
              <div
                className=" container mt-3 relative"
                style={{ width: "750px" }}
              >
                <div className="bg-white rounded-2xl shadow p-4">
                  <div className=" flex justify-between">
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
                    <div
                      class="  h-8  rounded-3xl flex items-center p-2 ms-2 mt-3 me-3 cursor-pointer"
                      onClick={() => {
                        setDeleteupdate(true);
                      }}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                      </svg>
                    </div>
                  </div>
                  {deleteupdate && (
                    <div>
                      <IoMdArrowDropup
                        size={10}
                        color="white"
                        className="absolute top-11 right-3"
                      />

                      <div className="absolute z-10 bg-white w-44 h-24 top-14 right-3 rounded-md shadow-2xl">
                        <div className="flex ">
                          <TiDelete className=" mt-3 ml-2" />
                          <p
                            className="text-black font-mono ps-2 pt-2 h-10 border-b cursor-pointer"
                            onClick={() => {
                              setPostId(post.post_id);
                              setDeletePost(true);
                            }}
                          >
                            delete post
                          </p>
                        </div>
                        {deletePost && (
                          <div id="myModal" className="modal2">
                            <div className="modal-content2 ml-10 w-">
                              <span
                                className="close2"
                                onClick={() => {
                                  setDeletePost(false);
                                }}
                              >
                                &times;
                              </span>
                              <p className=" text-2xl border-b-2">
                                delete post
                              </p>

                              <div className="mb-3 mt-3">
                                <p>
                                  if you delete post you can't return it again
                                </p>
                              </div>

                              <div className=" bg-black text-white w-20 rounded-lg pl-3 h-8 pt-1 " onClick={()=>{
                              DaletePost(postId)
                              }}>
                                <button>delete</button>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="flex ">
                          <RxUpdate className=" mt-3 ml-2" />
                          <p
                            className="text-black font-mono ps-2 pt-2 h-10 border-b cursor-pointer"
                            onClick={() => {
                              setPostId(post.post_id);
                              setPostBody(post.body)
                              setUpdatePost(true)
                            }}
                          >
                            update post
                          </p>
                        </div>
                        {updatePost&&(
                          <div id="myModal" className="modal2">
                          <div className="modal-content2 ml-10 w-">
                            <span
                              className="close2"
                              onClick={() => {
                                setUpdatePost(false);
                              }}
                            >
                              &times;
                            </span>
                            <p className=" text-2xl border-b-2">
                              Update post
                            </p>

                            <div className="mb-3 mt-3">
                            <textarea defaultValue={postBody} onChange={(e)=>{
                             setPostChange(e.target.value)
                            }}></textarea>
                            </div>

                            <div className=" bg-black text-white w-20 rounded-lg pl-3 h-8 pt-1 " onClick={()=>{
                            UpdatePost(postId)
                            }}>
                              <button>update</button>
                            </div>
                          </div>
                        </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="mt-4">
                    {false ? (
                      <input type="text" defaultValue={post.body} />
                    ) : (
                      <p>{post.body}</p>
                    )}

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
    /*  <div className="bg-zinc-100 w-full">
      {state.posts?.map((post, index) => {
        return (
          <div key={post.post_id} id="posts" className="">
            <div
              className="container mx-auto p-3 w-full relative"
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
    </div> */
  );
};

export default PorfilePosts;
