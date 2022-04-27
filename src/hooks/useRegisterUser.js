import { useState } from 'react';

import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  db,
} from '../firebase';
import {
  query,
  getDocs,
  collection,
  where,
  doc,
  setDoc
 } from "firebase/firestore";

import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';
import { setUserProfile } from '../redux/userDetailsSlice';

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
      const q = query(collection(db, "users"), where("uid", "==", userAuth.user.uid));
      getDocs(q)
        .then(docs => {
          if (docs.docs.length === 0) {
            setDoc(doc(db, "users", userAuth.user.uid), {
              uid: userAuth.user.uid,
              name: values.formFirstName.trim()+' '+values.formLastName.trim(),
              email: userAuth.user.email,
              profile: {
                firstName: values.formFirstName.trim(),
                lastName: values.formLastName.trim(),
                email: userAuth.user.email,
              }
            }).then(() => {
              dispatch(
                setUserProfile({
                  firstName: values.formFirstName.trim(),
                  lastName: values.formLastName.trim(),
                  email: userAuth.user.email,
                })
              )
            });
          }
        });
      setUsingPasswordSignUp(false);
      setSubmitting(false);
      callback(false, 'loggedIn');
      console.log("Out of Promise");
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