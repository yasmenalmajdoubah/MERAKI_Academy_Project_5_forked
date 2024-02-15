import { createSlice } from "@reduxjs/toolkit";

const logSlice = createSlice({
  name: "log",

  initialState: {
    token: localStorage.getItem("token") || "",
    userId: localStorage.getItem("userId") || "",
  },

  reducers: {
    setLogin: (state, action) => {
      (state.token = action.payload),
        localStorage.setItem("token", action.payload);
    },

    setUserId: (state, action) => {
      (state.userId = action.payload),
        localStorage.setItem("userId", action.payload);
    },

    setLogout: (state) => {
      (state.token = ""), (state.userId = ""), localStorage.clear();
    },
  },
});

export const { setLogin, setUserId, setLogout } = logSlice.actions;

export default logSlice.reducer;
