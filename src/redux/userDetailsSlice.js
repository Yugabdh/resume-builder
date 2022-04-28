import { createSlice } from '@reduxjs/toolkit';

export const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    userDetails: {
      profile: null,
      education: [],
      experience: [],
      otherDetails: {
        skills: [],
        achievements: [],
        interests: [],
        knownlanguages: [],
      }
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
    setUserSkills: (state, action) => {
      state.userDetails.otherDetails.skills = action.payload;
    },
    setUserAchievements: (state, action) => {
      state.userDetails.otherDetails.achievements = action.payload;
    },
    setUserInterests: (state, action) => {
      state.userDetails.otherDetails.interests = action.payload;
    },
    setUserKnownlanguages: (state, action) => {
      state.userDetails.otherDetails.knownlanguages = action.payload;
    },
    clearUserDetails: (state) => {
      state.userDetails.profile = null;
      state.userDetails.education = [];
      state.userDetails.experience = [];
      state.userDetails.otherDetails = {
        skills: [],
        achievements: [],
        interests: [],
        knownlanguages: [],
      };
    },
  },
});

export const { 
  setUserProfile,
  setUserEducation,
  clearUserDetails,
  setUserExperience,
  setUserSkills,
  setUserAchievements,
  setUserInterests,
  setUserKnownlanguages
} = userDetailsSlice.actions;

// selectors
export const selectDetails = (state) => state.userDetails.userDetails;
export const selectProfile = (state) => state.userDetails.userDetails.profile;
export const selectEducation = (state) => state.userDetails.userDetails.education;
export const selectExperience = (state) => state.userDetails.userDetails.experience;
export const selectSkills = (state) => state.userDetails.userDetails.otherDetails.skills;
export const selectAchievements = (state) => state.userDetails.userDetails.otherDetails.achievements;
export const selectInterests = (state) => state.userDetails.userDetails.otherDetails.interests;
export const selectKnownlanguages = (state) => state.userDetails.userDetails.otherDetails.knownlanguages;

export default userDetailsSlice.reducer;