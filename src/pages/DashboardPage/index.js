import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import { selectProfile, setUserProfile } from '../../redux/userDetailsSlice';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { makeVisible } from '../../redux/navbarTransparent';
import ProfileComponent from '../../components/ProfileComponent';

import {
  db,
} from '../../firebase';
import {
  query,
  getDocs,
  collection,
  where
 } from "firebase/firestore";

const DashboardPage = () => {
  const dispatch = useDispatch();

  // trigger on component mount
  useEffect(() => {
    dispatch(makeVisible());
  }, [dispatch]);

  // getting state from store
  const user = useSelector(selectUser);
  const profile = useSelector(selectProfile);

  // checking if userDetails are fetched 
  // if not fetch them from Firebase

  // callback to reduce dependency
  const [loadingFromAPI, setLoadingFromAPI] = useState(true);
  const getDataFromFirebase = useCallback(async () => {
    if (!profile) {
      setLoadingFromAPI(true);
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      getDocs(q)
        .then(docs => {
          if(docs.docs.length>0) {
            dispatch(setUserProfile({
              ...docs.docs[0].data().profile
            }))
          }
        }).finally(() => {
          setLoadingFromAPI(false);
        });
    } else {
      setLoadingFromAPI(false);
    }
  }, [user.uid]);

  useEffect(() => {
    getDataFromFirebase();
  }, [])

  return(
    <section className="dashboard-section">
      <Container>
        <Row className="justify-content-center">
          <Col sm={12} lg={4}>
            <ProfileComponent loadingFromAPI={loadingFromAPI} userProfile={profile} user={user}/>
          </Col>
          <Col sm={12} lg={8} className="pt-5 pt-lg-0">
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DashboardPage;
