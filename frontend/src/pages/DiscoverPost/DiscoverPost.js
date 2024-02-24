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



  return (
    <div>Global</div>
  )
}

export default Global