import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userInfo: {},
    visitUserInfo:{},
    follow:[] ,
    experience: [],
    workNow:{},
    institution:[]

  },

  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setVisitUserInfo:(state,action)=>{
       state.visitUserInfo=action.payload
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
        return elem.enddate=="now"
      })
    },
    setInstitutionFollow:(state,action)=>{
     state.institution=action.payload.filter((elem,i)=>{
      return elem.role_id===2
     })
    }

  },
});

export const { setUserInfo,setFollow,AddFollow,setExperience,setWorkNow,setInstitutionFollow,setVisitUserInfo } = profileSlice.actions;

export default profileSlice.reducer;
