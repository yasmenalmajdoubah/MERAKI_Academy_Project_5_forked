import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",

  initialState: {
    // from Trello
  },

  reducers: {
    // same as Trello
  },
});

export const {
  /* name of reducers above */
} = postsSlice.actions;

export default postsSlice.reducer;
