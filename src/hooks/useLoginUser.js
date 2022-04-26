import { useState } from 'react';

import {
  auth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from '../firebase';

import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';

const useLoginUser = (values, callback) => {
  const dispatch = useDispatch();
  // form states
  const [submitting, setSubmitting] = useState(false);
  const [usingPasswordSignIn, setUsingPasswordSignIn] = useState(false);
  const [usingGoogleSignUp, setUsingGoogleSignUp] = useState(false);

  const loginWithEmail = () => {
    setUsingPasswordSignIn(true);
    setSubmitting(true);
    
    signInWithEmailAndPassword(auth, values.formEmail.trim(), values.formPassword.trim())
    .then((userAuth) => {
      dispatch(
        login({
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          displayName: userAuth.user.displayName,
        })
      );
      callback(false, 'loggedIn');
    })
    .catch((error) => {
      callback(true, error.message);
      setUsingPasswordSignIn(false);
      setUsingGoogleSignUp(false);
      setSubmitting(false);
    });
  };

  const googleSignIn = () => {
    setUsingGoogleSignUp(true);
    setSubmitting(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((userAuth) => {
      dispatch(
        login({
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          displayName: userAuth.user.displayName,
        })
      );
      callback(false, 'loggedIn');
    }).catch((error) => {
      callback(true, error.message);
      setUsingPasswordSignIn(false);
      setUsingGoogleSignUp(false);
      setSubmitting(false);
    });
  };
  
  return {
    submitting,
    usingPasswordSignIn,
    usingGoogleSignUp,
    loginWithEmail,
    googleSignIn,
  }
};

export {
  useLoginUser
};