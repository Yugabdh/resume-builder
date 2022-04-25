import { configureStore } from '@reduxjs/toolkit';
import navbarTransparent from './redux/navbarTransparent';
import userSlice from './redux/userSlice';
import userDetailsSlice from './redux/userDetailsSlice';

export default configureStore({
  reducer: {
    navbarTransparent: navbarTransparent,
    user: userSlice,
    userDetails: userDetailsSlice,
  },
});