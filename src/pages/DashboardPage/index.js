import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
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
} from '../../redux/userDetailsSlice';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { makeVisible } from '../../redux/navbarTransparent';
import ProfileComponent from '../../components/ProfileComponent';
import StatusDashboardComponent from '../../components/StatusDashboardComponent';

import {
  db,
} from '../../firebase';
import {
  query,
  getDocs,
  collection,
  where
} from "firebase/firestore";

import { useGetUserData } from '../../hooks/useGetUserData';

const DashboardPage = () => {
  const dispatch = useDispatch();

  // trigger on component mount
  useEffect(() => {
    dispatch(makeVisible());
  }, [dispatch]);


  const {
    user, profile, loadingFromAPI, availableItems
  } = useGetUserData();

  // // getting state from store
  // const user = useSelector(selectUser);
  // const profile = useSelector(selectProfile);
  // const education = useSelector(selectEducation);
  // const experience = useSelector(selectExperience);
  // const achivements = useSelector(selectAchievements);
  // const interests = useSelector(selectInterests);
  // const languages = useSelector(selectKnownlanguages);
  // const skills = useSelector(selectSkills);

  // // checking if userDetails are fetched 
  // // if not fetch them from Firebase

  // // callback to reduce dependency
  // const [loadingFromAPI, setLoadingFromAPI] = useState(true);
  // const [availableItems, setAvailableItems] = useState([]);
  // const getDataFromFirebase = useCallback(async () => {
  //   if (!profile || 
  //     education.length === 0 || 
  //     experience.length === 0 || 
  //     achivements.length === 0 || 
  //     interests.length === 0 || 
  //     skills.length === 0 || 
  //     languages.length === 0) 
  //     {
  //     setLoadingFromAPI(true);
  //     const q = query(collection(db, "users"), where("uid", "==", user.uid));
  //     getDocs(q)
  //       .then(docs => {
  //         console.log("docs fetched")
  //         if(docs.docs.length>0) {
  //           if (docs.docs[0].data().profile) {
  //             dispatch(setUserProfile({
  //               ...docs.docs[0].data().profile
  //             }));
  //             if (docs.docs[0].data().profile.aboutMe) {
  //               setAvailableItems(items => [...items, "profile"]);
  //             }
  //           }

  //           if (docs.docs[0].data().education) {
  //             dispatch(setUserEducation([
  //               ...docs.docs[0].data().education
  //             ]));
  //             if (docs.docs[0].data().education.length >0) {
  //               setAvailableItems(items => [...items, "education"]);
  //             }
  //           }

  //           if(docs.docs[0].data().experience) {
  //             dispatch(setUserExperience([
  //               ...docs.docs[0].data().experience
  //             ]));
  //             if (docs.docs[0].data().experience.length >0) {
  //               setAvailableItems(items => [...items, "experience"]);
  //             }
  //           }

  //           if(docs.docs[0].data().achivements) {
  //             dispatch(setUserAchievements([
  //               ...docs.docs[0].data().achivements
  //             ]));
  //             if (docs.docs[0].data().achivements.length >0) {
  //               setAvailableItems(items => [...items, "achivements"]);
  //             }
  //           }

  //           if(docs.docs[0].data().interests) {
  //             dispatch(setUserInterests([
  //               ...docs.docs[0].data().interests
  //             ]));
  //             if (docs.docs[0].data().interests.length >0) {
  //               setAvailableItems(items => [...items, "interests"]);
  //             }
  //           }

  //           if(docs.docs[0].data().languages) {
  //             dispatch(setUserKnownlanguages([
  //               ...docs.docs[0].data().languages
  //             ]));
  //             if (docs.docs[0].data().languages.length >0) {
  //               setAvailableItems(items => [...items, "languages"]);
  //             }
  //           }

  //           if(docs.docs[0].data().skills) {
  //             dispatch(setUserSkills([
  //               ...docs.docs[0].data().skills
  //             ]));
  //             if (docs.docs[0].data().skills.length >0) {
  //               setAvailableItems(items => [...items, "skills"]);
  //             }
  //           }
  //         }
  //       }).finally(() => {
  //         setLoadingFromAPI(false);
  //       });
  //   } else {
  //     setAvailableItems(items => [...items, "profile", "education", "experience", "achivements", "interests", "interests", "languages", "skills"]);
  //     setLoadingFromAPI(false);
  //   }
  // }, [user.uid]);

  // useEffect(() => {
  //   getDataFromFirebase();
  // }, [])

  return(
    <section className="dashboard-section">
      <Container>
        <Row className="justify-content-center">
          <Col sm={12} lg={4}>
            <ProfileComponent loadingFromAPI={loadingFromAPI} userProfile={profile} user={user}/>
          </Col>
          <Col sm={12} lg={8} className="pt-5 pt-lg-0">
            <StatusDashboardComponent loadingFromAPI={loadingFromAPI} completion={availableItems} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DashboardPage;
