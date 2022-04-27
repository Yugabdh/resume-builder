import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import { selectEducation, setUserEducation } from '../../redux/userDetailsSlice';

import useForm from "../../hooks/useForm";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
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


import validate from './EducationFormValidationRules';


const EducationForm = () => {
  const dispatch = useDispatch();

  // getting state from store
  const user = useSelector(selectUser);
  const education = useSelector(selectEducation);

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
  } = useForm(updateEducation, validate);

  // Modal states
  const [modalData, setModalData] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const getDataFromFirebase = useCallback(async () => {
    if (!education) {
      setLoadingFromAPI(true);
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      getDocs(q)
        .then(docs => {
          if(docs.docs.length>0) {
            dispatch(setUserEducation([
              ...docs.docs[0].data().education
            ]));
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

  async function updateEducation() {
    setLoadingFromAPI(true);
    setDoc(doc(db, "users", user.uid), {
      education : [
        ...education,
        {
          ...values
        },
      ],
    }, { merge: true })
    .then(() => {
      dispatch(setUserEducation([
        ...education,
        {
          ...values
        },
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
    });
  }

  // location api key
  const [apiKey, setAPIKey] = useState();
  return (
    <>
      {
        loadingFromAPI ? (
          <FullScreenLoaderComponent />
        ) : 
        (
          <>
            <Accordion defaultActiveKey={[]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Add Education</Accordion.Header>
                <Accordion.Body>
                <Form onSubmit={ handleSubmit } noValidate>
                  <Form.Group className="mb-3">
                    <Row>
                      <Col md={12} lg={6}>
                        <Form.Label>Degree</Form.Label>
                        <Form.Control
                          autoComplete="off"
                          type="text"
                          placeholder="e.g. B.E."
                          name="degree"
                          onChange={handleChange}
                          value={values.degree || ''}
                          className={`${errors.degree && 'wrong-input'}`}
                          required
                        />
                        {
                          errors.degree && (<Form.Text className="text-danger">{errors.degree}</Form.Text>)
                        }
                      </Col>
                      <Col md={12} lg={6}>
                        <Form.Label>School/ University</Form.Label>
                        <Form.Control
                          autoComplete="off"
                          type="text"
                          placeholder="e.g. International Academy"
                          name="school"
                          onChange={handleChange}
                          value={values.school || ''}
                          className={`${errors.school && 'wrong-input'}`}
                          required
                        />
                        {
                          errors.school && (<Form.Text className="text-danger">{errors.school}</Form.Text>)
                        }
                      </Col>
                      <Col md={12} lg={4}>
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control 
                          type="date"
                          placeholder="Enter start date"
                          name="startdate"
                          value={values.startdate || ''}
                          className={`${errors.startdate && 'wrong-input'}`}
                          onChange={handleChange}
                          required
                          aria-describedby="startdate" 
                        />
                        {
                          errors.startdate && (<Form.Text className="text-danger">{errors.startdate}</Form.Text>)
                        }
                      </Col>
                      <Col md={12} lg={4} className={` ${values.enddatepresent? ' d-none ':'  '}`}>
                        <Form.Label>End Date</Form.Label>
                        <Form.Control 
                          type="date"
                          placeholder="Enter end date"
                          name="enddate"
                          value={values.enddate || ''}
                          className={`${errors.enddate && 'wrong-input'}`}
                          onChange={handleChange}
                          required
                          aria-describedby="enddate" 
                        />
                        {
                          errors.enddate && (<Form.Text className="text-danger">{errors.enddate}</Form.Text>)
                        }
                      </Col>
                      <Col md={12} lg={4} className={`d-flex align-items-center`}>
                      <label className="form-check-custom">
                        <input
                          type="checkbox"
                          name="enddatepresent"
                          value={values.enddatepresent || ''}
                          className={`${errors.enddatepresent && ' wrong-input '}`}
                          onChange={handleChange}
                          required
                          aria-describedby="enddatepresent" 
                        />
                        Present
                      </label>
                      </Col>
                    </Row>
                  </Form.Group>
                  <button type="submit" className="custom-button primary-button">Add Education</button>
                </Form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            {/* This modal will show up on error or success */}
            <VerticalCenteredModalComponent
              data={modalData}
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </>
        )
      }
    </>
  )
}

export default EducationForm