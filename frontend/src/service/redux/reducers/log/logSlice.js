import { createSlice } from "@reduxjs/toolkit";

const logSlice = createSlice({
  name: "log",

  initialState: {
    // from Trello
  },

  reducers: {
    // same as Trello
  },
});

export const {
  /* name of reducers above */
} = logSlice.actions;

export default logSlice.reducer;
