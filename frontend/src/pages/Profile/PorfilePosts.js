import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import {
  allPost,
  allComments,
  addComment,
} from "../../service/redux/reducers/posts/postsSlice";
const PorfilePosts = () => {



  const [comment, setComment] = useState(""); //
  const [message, setMessage] = useState("");
  const [post_id, setPost_id] = useState(false);
  const [show, setShow] = useState("");
  const dispatch = useDispatch();
  const {token,posts,userId} = useSelector((state) => {
    return {
      token: state.log.token,
      posts: state.posts.posts,
      userId: state.log.userId
    };
  });
  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/search_1?user=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(allPost(result.data.posts));
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  console.log(state.posts);

  }, []);

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
            Authorization: `Bearer ${token}`,
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




  return (
    <div>
      {/* <form className="posts-form"> */}
      {posts?.map((post, index) => {
        return (
          <div key={index} className="posts">
            <div>{post.post_id}</div>
            <div>{post.body}</div>
            <div>{post.image}</div>
            <div>
              {!post.comments && (
                <button
                  className="ShowBtn"
                  onClick={() => {
                    getCommentsByPost(post.post_id);
                    setShow(post.post_id);
                  }}
                >
                  Comment
                </button>
              )}
              <div>
                {post.comments?.map((comment, i) => {
                  return (
                    <p className="comment" key={i}>
                      {comment.comment}
                    </p>
                  );
                })}
              </div>

              {show == post.id && (
                <div>
                  <textarea
                    className="commentBox"
                    placeholder="comment..."
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />
                  <button
                    className="commentBtn"
                    onClick={() => {
                      if (comment) createComment(post.id);
                    }}
                  >
                    Add comment
                  </button>
                </div>
              )}

              {show == post.post_id && (
                <div>
                  <textarea
                    className="commentBox"
                    placeholder="comment..."
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />
                  <button
                    className="commentBtn"
                    onClick={() => {
                      if (comment) createComment(post.post_id);
                    }}
                  >
                    Add comment
                  </button>
                </div>
              )}

              <button onClick={() => {}}>LIKE</button>
            </div>
          </div>
        );
      })}

      {/* </form> */}
    </div>
  );
};

export default PorfilePosts