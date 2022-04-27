import { createSlice } from '@reduxjs/toolkit';

export const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    userDetails: {
      profile: null,
      education: [],
      experience: [],
    },
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.userDetails.profile = action.payload;
    },
    setUserEducation: (state, action) => {
      state.userDetails.education = action.payload;
    },
    setUserExperience: (state, action) => {
      state.userDetails.experience = action.payload;
    },
    clearUserDetails: (state) => {
      state.userDetails.profile = null;
      state.userDetails.education = [];
      state.userDetails.experience = [];
    },
  },
});

export const { setUserProfile, setUserEducation, clearUserDetails, setUserExperience } = userDetailsSlice.actions;

// selectors
export const selectDetails = (state) => state.userDetails.userDetails;
export const selectProfile = (state) => state.userDetails.userDetails.profile;
export const selectEducation = (state) => state.userDetails.userDetails.education;
export const selectExperience = (state) => state.userDetails.userDetails.experience;

export default userDetailsSlice.reducer;