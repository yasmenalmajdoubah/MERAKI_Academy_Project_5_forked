import { useSelector, useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import React from "react";
import axios from "axios";
import { allPost,allComments,addComment } from "../../service/redux/reducers/posts/postsSlice";

export const Post = () => {
  const [comment, setComment] = useState("");//
  const [message, setMessage] = useState("");
  const [post_id, setPost_id] = useState(false);
  const [show, setShow] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.log.token,
      postURL: state.posts.postURL,
      posts :state.posts.posts,
      
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


/*
  const handleUpdateClick = (post) => {
    
    setPost_id(post.post_id);
    
   

  }

*/
///get comments 
const getCommentsByPost = async (post_id) => {
  try {
    const result = await axios.get(
      `http://localhost:5000/comments/${post_id}`);
    if (result.data.success) {
      const comments = result.data.result;
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
      `http://localhost:5000/comments/${post_id}`,
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
      const newCommet = result.data.result
      dispatch(addComment({ newCommet, post_id }))
    getCommentsByPost(post_id);
    } 
    
  } catch (error) {
    console.log(error);
  }
};


  // ================================
  return <div> 
<form className="posts-form">
{state.posts?.map((post,index)=>{

<div key={index} className="posts">
<div>{post.user_id}</div>
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


</div>

</div>
})}

</form>
  </div>
};
