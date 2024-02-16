import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",

  initialState: {
    posts: [],
    postURL:""
  },

  reducers:
   {
    //*  get all posts
    allPost: (state, action) => {
      state.posts = action.payload;
    },
    //* add new post to posts array
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    //* update post
    updatePost: (state, action) => {
      state.posts = state.posts.map((elem, i) => {
        if (elem.id === action.payload.id) {
          elem.title = action.payload.title;
          elem.body = action.payload.body;
        }
        return elem;
      });
    },
    //* delete post
    deletePost: (state, action) => {
      state.posts = state.posts.filter((elem, i) => {
        return elem.id !== action.payload;
      });
    },

    //* get all comments
    allComments: (state, action) => {
      state.posts = state.posts.map((elem, i) => {
        if (elem.id === action.payload.post_id) {
          state.posts[post_id].comment = action.payload.comments;
        }
        return elem;
      });
    },
    //* add new comment to comments
    addComment: (state, action) => {
      state.posts = state.posts.map((elem, i) => {
        if (elem.id === action.payload.post_id) {
          elem.comments.push(action.payload.newCommet);
        }
        return elem;
      });
    },
    //* delete comment
    deleteComment: (state, action) => {
      // code here
    },

    //* get all likes of post
    allLikes: (state, action) => {
      // code here
    },
    //* to add like to post
    addLike: (state, action) => {
      // code here
    },
    removeLike: (state, action) => {
      //code here
    },
    setPostURL: (state, action) => {
      state.postURL=action.payload
    },
  },
});

export const {
  addPost,
  updatePost,
  deletePost,
  allPost,
  allComments,
  addComment,
  setPostURL
} = postsSlice.actions;

export default postsSlice.reducer;
