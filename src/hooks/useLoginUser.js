import { useState } from 'react';

import {
  auth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  db,
} from '../firebase';

import {
  query,
  getDocs,
  collection,
  where,
  setDoc,
  doc
 } from "firebase/firestore";

import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';

import {
  setUserProfile,
  setUserEducation,
  setUserExperience,
  setUserAchievements,
  setUserInterests,
  setUserKnownlanguages,
  setUserSkills,
} from '../redux/userDetailsSlice';

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
      const q = query(collection(db, "users"), where("uid", "==", userAuth.user.uid));
      getDocs(q)
        .then(docs => {
          if (docs.docs.length === 1) {
            if (docs.docs[0].data().profile) {
              dispatch(setUserProfile({
                ...docs.docs[0].data().profile
              }))
            }

            if (docs.docs[0].data().education) {
              dispatch(setUserEducation([
                ...docs.docs[0].data().education
              ]));
            }

            if(docs.docs[0].data().experience) {
              dispatch(setUserExperience([
                ...docs.docs[0].data().experience
              ]));
            }

            if(docs.docs[0].data().achivements) {
              dispatch(setUserAchievements([
                ...docs.docs[0].data().achivements
              ]));
            }

            if(docs.docs[0].data().interests) {
              dispatch(setUserInterests([
                ...docs.docs[0].data().interests
              ]));
            }

            if(docs.docs[0].data().languages) {
              dispatch(setUserKnownlanguages([
                ...docs.docs[0].data().languages
              ]));
            }

            if(docs.docs[0].data().skills) {
              dispatch(setUserSkills([
                ...docs.docs[0].data().skills
              ]));
            }
          }
        });
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
      const q = query(collection(db, "users"), where("uid", "==", userAuth.user.uid));
      getDocs(q)
        .then(docs => {
          if (docs.docs.length === 0) {
            setDoc(doc(db, "users", userAuth.user.uid), {
              uid: userAuth.user.uid,
              displayName: userAuth.user.displayName,
              email: userAuth.user.email,
              profile : {
                firstName: userAuth.user.displayName.split(" ")[0],
                lastName: userAuth.user.displayName.split(" ")[1],
                email: userAuth.user.email,
              },
            }).then(() => {
              dispatch(setUserProfile({
                firstName: userAuth.user.displayName.split(" ")[0],
                lastName: userAuth.user.displayName.split(" ")[1],
                email: userAuth.user.email,
              }))
            });
          } else {
            if (docs.docs[0].data().profile) {
              dispatch(setUserProfile({
                ...docs.docs[0].data().profile
              }))
            }

            if (docs.docs[0].data().education) {
              dispatch(setUserEducation([
                ...docs.docs[0].data().education
              ]));
            }

            if(docs.docs[0].data().experience) {
              dispatch(setUserExperience([
                ...docs.docs[0].data().experience
              ]));
            }

            if(docs.docs[0].data().achivements) {
              dispatch(setUserAchievements([
                ...docs.docs[0].data().achivements
              ]));
            }

            if(docs.docs[0].data().interests) {
              dispatch(setUserInterests([
                ...docs.docs[0].data().interests
              ]));
            }

            if(docs.docs[0].data().languages) {
              dispatch(setUserKnownlanguages([
                ...docs.docs[0].data().languages
              ]));
            }

            if(docs.docs[0].data().skills) {
              dispatch(setUserSkills([
                ...docs.docs[0].data().skills
              ]));
            }
          }
        });
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