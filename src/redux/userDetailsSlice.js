import { createSlice } from '@reduxjs/toolkit';

export const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    userDetails: null,
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    clearUserDetails: (state) => {
      state.userDetails = null;
    },
  },
});

export const { setUserDetails, clearUserDetails } = userDetailsSlice.actions;

// selectors
export const selectDetails = (state) => state.userDetails;
export const selectProfile = (state) => state.userDetails.profile;

export default userDetailsSlice.reducer;