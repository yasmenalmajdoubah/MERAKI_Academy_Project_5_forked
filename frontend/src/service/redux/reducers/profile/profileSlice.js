import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userInfo: {},
    follow:[] 
  },

  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setFollow:(state,action) =>{
      state.follow=action.payload
    }
  },
});

export const { setUserInfo,setFollow } = profileSlice.actions;

export default profileSlice.reducer;
