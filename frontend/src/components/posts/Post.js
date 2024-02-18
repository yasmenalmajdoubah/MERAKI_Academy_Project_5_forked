import { useSelector, useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import React from "react";
import axios from "axios";
import { allPost } from "../../service/redux/reducers/posts/postsSlice";

export const Post = () => {
  const [comment, setComment] = useState("");//
  const [message, setMessage] = useState("");
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

///get comments 
const getCommentsByPost = async (post_id) => {
  try {
    const result = await axios.get(
      `http://localhost:5000/comments/${post_id}`);
    if (result.data.success) {
      setComment( result.data.result);
      
    } else throw Error;
  } catch (error) {
    if (!error.response.data) {
      return setMessage(error.response.data.message);
    }
    setMessage("Error happened while Get Data, please try again");
  }
};











//state.posts
  // ================================
  return <div> 
<form className="posts-form">
{state.posts?.map((post,index)=>{

<div key={index} className="posts">
<div>{post.user_id}</div>
<div>{post.body}</div>
<div>{post.image}</div>
<div>
  <button onClick={post.comment}>COMMENTS</button>



  <button onClick={()=>}>LIKE</button>
</div>

</div>
})}

</form>
  </div>
};
/*
articles?.map((article, index) => (
        <div key={index} className="article">
          <div>{article.title}</div>
          <div>{article.description}</div>
          {!article.comments && (
            <button
              className="ShowBtn"
              onClick={() => {
                getCommentsByArticle(article.id);
                setShow(article.id);
              }}
            >
              show comment
            </button>
          )}
          <div>
            {article.comments?.map((comment, i) => {
              return (
                <p className="comment" key={i}>
                  {comment.comment}
                </p>
              );
            })}
          </div>
          {show == article.id && (
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
                  if (comment) createComment(article.id);
                }}
              >
                Add comment
              </button>
            </div>
          )}
          {article.author_id === parseInt(userId) && (
            <>
              {updateBox && articleId === article.id && (
                <form>
                  <br />
                  <input
                    type="text"
                    defaultValue={article.title}
                    placeholder="article title here"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <br />

                  <textarea
                    placeholder="article description here"
                    defaultValue={article.description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </form>
              )}
              <button
                className="delete"
                onClick={() => deleteArticle(article.id)}
              >
                X
              </button>
              <button
                className="update"
                onClick={() => handleUpdateClick(article)}
              >
                Update
              </button>
            </>
          )}
        </div>
      ))}
      {message && <div>{message}</div>}
*/