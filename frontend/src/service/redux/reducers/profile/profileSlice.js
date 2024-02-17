import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",

  initialState: {

    userInfo: {},
  },

  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInfo } = profileSlice.actions;


export default profileSlice.reducer;
