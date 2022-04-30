import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeVisible } from '../../redux/navbarTransparent';
import CardComponentWithHeading from '../../components/CardComponentWithHeading';
import ResumesTableComponent from '../../components/ResumesTableComponent';

import {
  db,
} from '../../firebase';
import {
  query,
  getDocs,
  collection,
} from "firebase/firestore";

import { selectUser } from '../../redux/userSlice';

const ResumesPage = () => {
  const dispatch = useDispatch();

  // trigger on component mount
  useEffect(() => {
    dispatch(makeVisible());
  }, [dispatch]);

  const user = useSelector(selectUser);
  const [storedResumes, setStoredResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getResumes = useCallback(async () => {
    setLoading(true);
    const q = query(collection(db, "users/"+user.uid+"/resumes"));
    getDocs(q)
      .then(docs => {
        console.log("docs fetched")
        if(docs.docs.length>0) {
          setStoredResumes([...docs.docs]);
        } else {
          console.log("No resumes found");
        }
      }).finally(() => {
        setLoading(false);
      });
  });

  useEffect(() => {
    if(storedResumes.length === 0) {
      getResumes();
    } else {
      setLoading(false);
    }
  }, [])
  
  return (
    <section className="resumes-page">
      <CardComponentWithHeading heading={<h3 className="card-heading">Pevious Resumes</h3>} children={<ResumesTableComponent storedResumes={storedResumes} loading={loading} />} />
    </section>
  )
}

export default ResumesPage;