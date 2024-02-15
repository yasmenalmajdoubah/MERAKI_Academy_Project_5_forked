import { createSlice } from "@reduxjs/toolkit";

const logSlice = createSlice({
  name:"log",
  initialState :{
      
      token:localStorage.getItem("token") || null,
      userId:localStorage.getItem("userId") || null,
      isLoggedIn:localStorage.getItem("token") ? true : false
  },
  reducers :{
      setLogin :(state , action)=>{
         
          state.isLoggedIn=true,
          state.token=action.payload,
          localStorage.setItem("token",state.token)

      } ,

      setUserId : (state , action)=>{
          state.userId = action.payload,
          localStorage.setItem("userId", state.userId)
      } ,
      
      setLogout : (state , action) =>{
          state.token=null,
          state.userId=null,
          state.isLoggedIn=false,
          localStorage.clear()
      }   
  }
});

export const {
  setLogin,setUserId,setLogout
} = logSlice.actions;

export default logSlice.reducer;
