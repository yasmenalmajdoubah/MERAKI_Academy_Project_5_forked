import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userInfo: {},
    follow:[] ,
    experience: []
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
    setExperience:(state,action)=>{
      state.experience=action.payload
      },
    

  },
});

export const { setUserInfo,setFollow,AddFollow,setExperience } = profileSlice.actions;

export default profileSlice.reducer;
