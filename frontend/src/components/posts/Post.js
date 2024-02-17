import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import React from "react";
import axios from "axios";
import { allPost } from "../../service/redux/reducers/posts/postsSlice";

export const Post = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.log.token,
      postURL: state.posts.postURL,
    };
  });
  // ===============================
  useEffect(() => {
    axios
      .get(`${state.postURL}`, {
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

  // ================================
  return <div></div>
};
