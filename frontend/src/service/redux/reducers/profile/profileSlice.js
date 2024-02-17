import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",

  initialState: {
    profileImage: "",
    covorImage: "",
    about: "",
    job: "",
  },

  reducers: {
    setProfileImage: (state, action) => {},
    setCoverImage: (state, action) => {},
    setAbout: (state, action) => {},
    setJob: (state, action) => {},
    updateprofileImage: (state, action) => {},
    updateCoverImage: (state, action) => {},
  },
});

export const { setProfileImage, setCoverImage, setAbout, setJob } =
  profileSlice.actions;

export default profileSlice.reducer;
