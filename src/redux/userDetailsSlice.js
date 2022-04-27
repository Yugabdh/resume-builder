import { createSlice } from '@reduxjs/toolkit';

export const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    userDetails: {
      profile: null,
      education: null,
    },
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.userDetails.profile = action.payload;
    },
    clearUserDetails: (state) => {
      state.userDetails.profile = null;
    },
  },
});

export const { setUserProfile, clearUserDetails } = userDetailsSlice.actions;

// selectors
export const selectDetails = (state) => state.userDetails.userDetails;
export const selectProfile = (state) => state.userDetails.userDetails.profile;

export default userDetailsSlice.reducer;