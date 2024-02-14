import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",

  initialState: {
    // from Trello
  },

  reducers: {
    // same as Trello
  },
});

export const {
  /* name of reducers above */
} = profileSlice.actions;

export default profileSlice.reducer;
