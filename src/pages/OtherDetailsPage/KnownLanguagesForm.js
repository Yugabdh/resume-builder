import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import { selectKnownlanguages, setUserKnownlanguages } from '../../redux/userDetailsSlice';

import useForm from "../../hooks/useForm";

import { MdDelete } from "react-icons/md";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {
  db,
} from '../../firebase';
import {
  query,
  getDocs,
  collection,
  where,
  setDoc,
  doc
} from "firebase/firestore";

import VerticalCenteredModalComponent from '../../components/VerticalCenteredModalComponent/';
import FullScreenLoaderComponent from '../../components/FullScreenLoaderComponent';

import validate from './FormValidationRules';

const KnownLanguagesForm = () => {
  const dispatch = useDispatch();

  // getting state from store
  const user = useSelector(selectUser);
  const languages = useSelector(selectKnownlanguages);

  // checking if userDetails are fetched 
  // if not fetch them from Firebase

  // callback to reduce dependency
  const [loadingFromAPI, setLoadingFromAPI] = useState(true);
  const {
    values,
    setValues,
    errors,
    handleChange,
    handleSubmit,
    setIsSubmitting,
  } = useForm(updateLanguages, validate);

  // Modal states
  const [modalData, setModalData] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const getDataFromFirebase = useCallback(async () => {
    if (languages.length === 0) {
      setLoadingFromAPI(true);
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      getDocs(q)
        .then(docs => {
          if(docs.docs.length>0) {
            if(docs.docs[0].data().languages) {
              dispatch(setUserKnownlanguages([
                ...docs.docs[0].data().languages
              ]));
            }
          }
        })
        .finally( () => {
            setLoadingFromAPI(false)
          }
        );
    } else {
      setLoadingFromAPI(false);
    }
  }, []);

  useEffect(() => {
    getDataFromFirebase();
  }, [])

  async function updateLanguages() {
    setLoadingFromAPI(true);
    setDoc(doc(db, "users", user.uid), {
      languages : [
        ...languages, values.data,
      ],
    }, { merge: true })
    .then(() => {
      dispatch(setUserKnownlanguages([
        ...languages, values.data,
      ]));
    })
    .catch(err => {
      setModalData({
        title: "Error",
        message: "Unknown error occurred",
        classname: "error"
      });
      setModalShow(true);
    }).finally(() => {
      setLoadingFromAPI(false);
      setValues({})
      setIsSubmitting(false);
    });
  }

  const deleteLanguage = async (event) => {
    setLoadingFromAPI(true);
    let toDelete = parseInt(event.currentTarget.dataset.count);
    let temp = [];
    for(let i =0; i<languages.length; i++) {
      if(toDelete !== i) {
        temp.push(languages[i])
      }
    }
    setDoc(doc(db, "users", user.uid), {
      languages : [
        ...temp
      ],
    }, { merge: true })
    .then(() => {
      dispatch(setUserKnownlanguages([
        ...temp,
      ]));
    })
    .catch(err => {
      setModalData({
        title: "Error",
        message: "Unknown error occurred",
        classname: "error"
      });
      setModalShow(true);
    }).finally(() => {
      setLoadingFromAPI(false);
      setValues({})
    });
  }
  return (
    <>
      {
        loadingFromAPI ? (
          <FullScreenLoaderComponent />
        ) : 
        (
          <>
          <Row>
            <Col lg={12}>
              <Form onSubmit={ handleSubmit } noValidate>
                <Form.Group className="mb-3">
                  <Row>
                    <Col md={12} lg={4}>
                      <Form.Control
                        autoComplete="off"
                        type="text"
                        placeholder="e.g. English"
                        name="data"
                        onChange={handleChange}
                        value={values.data || ''}
                        className={`${errors.data && 'wrong-input'}`}
                        required
                      />
                      {
                        errors.data && (<Form.Text className="text-danger">{errors.data}</Form.Text>)
                      }
                    </Col>
                    <Col md={12} lg={4}>
                      <button type="submit" className="custom-button primary-button">+ Add Language</button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
              {/* This modal will show up on error or success */}
              <VerticalCenteredModalComponent
                data={modalData}
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </Col>
            <Col lg={12}>
              <div className="pills-wrapper">
                {
                  Array.isArray(languages) ? languages.map((item, idx) => (
                    <div className="pill-container" key={idx}>
                      <div className="pills-container-main">
                        <div className="pill">{item}</div>
                        <div className="pill-button" data-count={idx} onClick={deleteLanguage}><MdDelete /></div>
                      </div>
                    </div>
                  )): null
                }
              </div>
            </Col>
          </Row>
          </>
        )
      }
    </>
  )
}

export default KnownLanguagesForm;