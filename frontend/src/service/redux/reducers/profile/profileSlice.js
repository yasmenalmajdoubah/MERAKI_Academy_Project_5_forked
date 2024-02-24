import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userInfo: {},
    follow:[] ,
    experience: [],
    workNow:{}
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
    setWorkNow:(state,action)=>{
      state.workNow=action.payload.filter((elem,i)=>{
        console.log('elem.enddate', typeof elem.enddate)
        return elem.enddate=="now"
      })
      console.log('state.workNow', state.workNow)
    }

  },
});

export const { setUserInfo,setFollow,AddFollow,setExperience,setWorkNow } = profileSlice.actions;

export default profileSlice.reducer;
