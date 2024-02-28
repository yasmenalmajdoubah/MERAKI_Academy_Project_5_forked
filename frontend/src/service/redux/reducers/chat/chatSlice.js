import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",

  initialState: {
    chat: [],
    userChat:[]
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
    setUserChat:(state,action)=> {
      state.userChat = action.payload;
    },
    addUserChat: (state, action) => {
      state.userChat = state.userChat.map((elem, i) => {
        if (elem.user_id === action.payload.to_id) {
          elem.userChat.push(action.payload.messages);
        }
        return elem;
      });
    },
  },
});

export const { addChat, allChat,setUserChat,
  addUserChat } = chatSlice.actions;

export default chatSlice.reducer;
