import { createSlice } from '@reduxjs/toolkit';

export const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    userDetails: {
      profile: null,
      education: [],
    },
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.userDetails.profile = action.payload;
    },
    setUserEducation: (state, action) => {
      state.userDetails.education = action.payload;
    },
    clearUserDetails: (state) => {
      state.userDetails.profile = null;
    },
  },
});

export const { setUserProfile, setUserEducation, clearUserDetails } = userDetailsSlice.actions;

// selectors
export const selectDetails = (state) => state.userDetails.userDetails;
export const selectProfile = (state) => state.userDetails.userDetails.profile;
export const selectEducation = (state) => state.userDetails.userDetails.education;

export default userDetailsSlice.reducer;