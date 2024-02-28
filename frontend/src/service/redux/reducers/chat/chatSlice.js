import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",

  initialState: {
    chat: [],
   
  },

  reducers: {
    //*  get all posts
    allChat: (state, action) => {
      state.chat = action.payload;
    },
    //* add new post to posts array
    addChat: (state, action) => {
      state.chat.push(action.payload);
    },
    
  },
});

export const {
 addChat,allChat
} = chatSlice.actions;

export default chatSlice.reducer;
