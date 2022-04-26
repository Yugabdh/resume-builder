import { useState } from 'react';

import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from '../firebase';

import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';

const useRegisterUser = (values, callback) => {
  const dispatch = useDispatch();

  // form states
  const [submitting, setSubmitting] = useState(false);
  const [usingPasswordSignUp, setUsingPasswordSignUp] = useState(false);

  const registerWithEmail = () => {
    setUsingPasswordSignUp(true);
    setSubmitting(true);
    createUserWithEmailAndPassword(auth, values.formEmail.trim(), values.formPassword.trim())
    .then((userAuth) => {
      updateProfile(userAuth.user, {
        displayName: values.formFirstName.trim()+' '+values.formLastName.trim(),
      })
      .then(
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: values.formFirstName.trim()+' '+values.formLastName.trim(),
          })
        )
      )
      .catch((error) => {
        callback(true, 'user not updated');
      });
      setUsingPasswordSignUp(false);
      setSubmitting(false);;
      callback(false, 'loggedIn');
    })
    .catch((error) => {
      callback(true, error.message);
      setUsingPasswordSignUp(false);
      setSubmitting(false);
    });
  };

  return {
    submitting,
    usingPasswordSignUp,
    registerWithEmail,
  }
};

export {
  useRegisterUser
};