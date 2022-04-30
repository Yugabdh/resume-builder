import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import { 
  selectProfile, 
  setUserProfile,
  selectEducation,
  setUserEducation,
  selectExperience,
  setUserExperience,
  selectAchievements,
  setUserAchievements,
  selectInterests,
  setUserInterests,
  selectKnownlanguages,
  setUserKnownlanguages,
  selectSkills,
  setUserSkills,
} from '../redux/userDetailsSlice';

import {
  db,
} from '../firebase';

import {
  query,
  getDocs,
  collection,
  where
} from "firebase/firestore";

const useGetUserData = () => {
  const dispatch = useDispatch();

  // callback to reduce dependency
  const [loadingFromAPI, setLoadingFromAPI] = useState(true);
  const [availableItems, setAvailableItems] = useState([]);

  // getting state from store
  const user = useSelector(selectUser);
  const profile = useSelector(selectProfile);
  const education = useSelector(selectEducation);
  const experience = useSelector(selectExperience);
  const achivements = useSelector(selectAchievements);
  const interests = useSelector(selectInterests);
  const languages = useSelector(selectKnownlanguages);
  const skills = useSelector(selectSkills);

  const getDataFromFirebase = useCallback(async () => {
    if (!profile || 
      education.length === 0 || 
      experience.length === 0 || 
      achivements.length === 0 || 
      interests.length === 0 || 
      skills.length === 0 || 
      languages.length === 0) 
      {
      setLoadingFromAPI(true);
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      getDocs(q)
        .then(docs => {
          console.log("docs fetched")
          if(docs.docs.length>0) {
            if (docs.docs[0].data().profile) {
              dispatch(setUserProfile({
                ...docs.docs[0].data().profile
              }));
              if (docs.docs[0].data().profile.aboutMe) {
                setAvailableItems(items => [...items, "profile"]);
              }
            }

            if (docs.docs[0].data().education) {
              let ed = docs.docs[0].data().education;
              ed = ed.slice().sort((a, b) => new Date(b.startdate) - new Date(a.startdate));
              dispatch(setUserEducation([
                ...ed
              ]));
              if (ed.length >0) {
                setAvailableItems(items => [...items, "education"]);
              }
            }

            if(docs.docs[0].data().experience) {
              let ex = docs.docs[0].data().experience;
              ex = ex.slice().sort((a, b) => new Date(b.startdate) - new Date(a.startdate));
              dispatch(setUserExperience([
                ...ex
              ]));
              console.log(ex);
              if (ex.length >0) {
                setAvailableItems(items => [...items, "experience"]);
              }
            }

            if(docs.docs[0].data().achivements) {
              dispatch(setUserAchievements([
                ...docs.docs[0].data().achivements
              ]));
              if (docs.docs[0].data().achivements.length >0) {
                setAvailableItems(items => [...items, "achivements"]);
              }
            }

            if(docs.docs[0].data().interests) {
              dispatch(setUserInterests([
                ...docs.docs[0].data().interests
              ]));
              if (docs.docs[0].data().interests.length >0) {
                setAvailableItems(items => [...items, "interests"]);
              }
            }

            if(docs.docs[0].data().languages) {
              dispatch(setUserKnownlanguages([
                ...docs.docs[0].data().languages
              ]));
              if (docs.docs[0].data().languages.length >0) {
                setAvailableItems(items => [...items, "languages"]);
              }
            }

            if(docs.docs[0].data().skills) {
              dispatch(setUserSkills([
                ...docs.docs[0].data().skills
              ]));
              if (docs.docs[0].data().skills.length >0) {
                setAvailableItems(items => [...items, "skills"]);
              }
            }
          }
        }).finally(() => {
          setLoadingFromAPI(false);
        });
    } else {
      setAvailableItems(items => [...items, "profile", "education", "experience", "achivements", "interests", "languages", "skills"]);
      setLoadingFromAPI(false);
    }
  }, [user.uid]);

  useEffect(() => {
    getDataFromFirebase();
  }, []);

  return {
    user, profile, education, experience, achivements, interests, languages, skills, loadingFromAPI, availableItems,
  }
}

export {
  useGetUserData
};