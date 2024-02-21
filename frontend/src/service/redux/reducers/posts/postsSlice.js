import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",

  initialState: {
    posts: [],
    postURL:"",
   comments:[],
  
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
      console.log('first', action.payload)
      state.posts = state.posts.map((elem, i) => {
        if (elem.post_id === action.payload.post_id) {
         elem.comments= action.payload.comments;
         console.log('elem',  elem.comments)
        }
        return elem;
      });
    },
    //* add new comment to comments
    addComment: (state, action) => {
      console.log (action.payload)
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
         elem.likes= action.payload.likes;
        
        }
        return elem;
      });
    },
    //* to add like to post
    addLike: (state, action) => {
      console.log (action.payload)
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
  setPostURL,
  allLikes,
  addLike,
  removeLike
} = postsSlice.actions;

export default postsSlice.reducer;
