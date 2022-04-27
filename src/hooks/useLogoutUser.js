import { useDispatch, useSelector } from 'react-redux';

import { logout, selectUser } from '../redux/userSlice';
import { clearUserDetails } from '../redux/userDetailsSlice';
import { auth } from '../firebase';

export const useLogoutUser = (callback) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const logoutUser = () => {
    if (user) {
      dispatch(logout());
      dispatch(clearUserDetails());
      auth.signOut();
      callback();
    }
  };

  return {
    logoutUser,
  }
};