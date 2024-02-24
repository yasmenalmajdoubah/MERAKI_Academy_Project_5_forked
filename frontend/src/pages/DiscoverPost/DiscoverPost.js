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

import { TfiCommentAlt } from "react-icons/tfi";
import PostLoader from "../../components/PostsLoader/PostLoader";

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
    };
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/search_2`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        dispatch(allPost(result.data.posts));
        console.log(result.data.posts);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

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

  return (
    <div className="bg-zinc-200 mt-5">
      {state.posts.length !== 0 ? (
        state.posts?.map((post, index) => {
          return (
            <div key={post.post_id} className="">
              <div
                className="container mt-3 relative"
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
};

export default Global;
