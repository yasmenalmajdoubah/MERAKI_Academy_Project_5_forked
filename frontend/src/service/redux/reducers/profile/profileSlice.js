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
    },
    AddFollow:(state,action)=>{
    state.follow.push(action.payload)
    },
    

  },
});

export const { setUserInfo,setFollow,AddFollow } = profileSlice.actions;

export default profileSlice.reducer;
