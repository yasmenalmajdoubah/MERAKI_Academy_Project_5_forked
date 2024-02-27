import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",

  initialState: {
    posts: [],
    postURL: "",
    comments: [],
    userLikes: [],
    jobs:[]
  },

  reducers: {
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
        if (elem.post_id === action.payload.post_id) {
          elem.comments = action.payload.comments;
        }
        return elem;
      });
    },
    //* add new comment to comments
    addComment: (state, action) => {
      state.posts = state.posts.map((elem, i) => {
        if (elem.post_id === action.payload.post_id) {
          elem.comments.push(action.payload.newCommet);
        }
        return elem;
      });
    },
    //* delete comment
    deleteComment: (state, action) => {
      state.posts = state.posts.filter((elem, i) => {
        return elem.id !== action.payload;
      });
    },

    //* get all likes of post
    allLikes: (state, action) => {
      state.posts = state.posts.map((elem, i) => {
        if (elem.post_id === action.payload.post_id) {
          elem.likes = action.payload.likes;
        }
        return elem;
      });
    },
    //* to add like to post
    addLike: (state, action) => {
      state.posts = state.posts.map((elem, i) => {
        if (elem.post_id === action.payload.post_id) {
          elem.likes.push(action.payload.likes);
        }
        return elem;
      });
    },
    removeLike: (state, action) => {
      state.posts = state.posts.filter((elem, i) => {
        return elem.id !== action.payload;
      });
    },
    setPostURL: (state, action) => {
      state.postURL = action.payload;
    },

    // *get all liked posts for user
    setAllLikedPosts: (state, action) => {
      state.userLikes = action.payload;
    },
    setJobInstitution:(state,action)=>{
      console.log("action",action.payload);
      state.jobs=action.payload
    }
  },
});

export const {
  addPost,
  updatePost,
  deletePost,
  allPost,
  allComments,
  addComment,
  setPostURL,
  allLikes,
  addLike,
  removeLike,
  setAllLikedPosts,
  setJobInstitution
} = postsSlice.actions;

export default postsSlice.reducer;
