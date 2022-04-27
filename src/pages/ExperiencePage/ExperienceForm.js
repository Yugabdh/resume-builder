import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import { selectExperience, setUserExperience } from '../../redux/userDetailsSlice';

import useForm from "../../hooks/useForm";

import { MdDelete } from "react-icons/md";
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

import validate from './ExperienceFormValidationRules';

const ExperienceForm = () => {
  
  const dispatch = useDispatch();

  // getting state from store
  const user = useSelector(selectUser);
  const experience = useSelector(selectExperience);

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
  } = useForm(updateExperience, validate);

  // Modal states
  const [modalData, setModalData] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const getDataFromFirebase = useCallback(async () => {
    if (experience.length === 0) {
      setLoadingFromAPI(true);
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      getDocs(q)
        .then(docs => {
          if(docs.docs.length>0) {
            if(docs.docs[0].data().experience) {
              dispatch(setUserExperience([
                ...docs.docs[0].data().experience
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

  async function updateExperience() {
    setLoadingFromAPI(true);
    setDoc(doc(db, "users", user.uid), {
      experience : [
        ...experience,
        {
          ...values
        },
      ],
    }, { merge: true })
    .then(() => {
      dispatch(setUserExperience([
        ...experience,
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
      setValues({})
    });
  }

  const deleteCourse = async (event) => {
    let toDelete = event.currentTarget.dataset.count;
    let temp = [];
    for(let i =0; i<experience.length; i++) {
      if(toDelete !== i) {
        temp.push(experience[i])
      }
    }
    setLoadingFromAPI(true);
    setDoc(doc(db, "users", user.uid), {
      experience : [
        ...temp
      ],
    }, { merge: true })
    .then(() => {
      dispatch(setUserExperience([
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
            <Accordion defaultActiveKey={[]} alwaysOpen>
              {
                Array.isArray(experience) ? experience.map((item, idx) => (
                  <Accordion.Item eventKey={idx} key={idx}>
                    <Accordion.Header>{item.company}</Accordion.Header>
                    <Accordion.Body className="course-body">
                      <button type="button" onClick={deleteCourse} data-count={idx} className="course-delete-button"><MdDelete /></button>
                      <b className="course-degree">{item.jobtitle}</b>
                      <p className="pt-2 course-school">{item.company}</p>
                      <p className="course-period">{item.startdate}-{item.enddate?item.enddate: 'Present'}</p>
                      <p className="course-period">{item.description}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                )): null
              }
              <Accordion.Item eventKey="0">
                <Accordion.Header>Add Experience</Accordion.Header>
                <Accordion.Body>
                <Form onSubmit={ handleSubmit } noValidate>
                  <Form.Group className="mb-3">
                    <Row>
                      <Col md={12} lg={6}>
                        <Form.Label>Job Title</Form.Label>
                        <Form.Control
                          autoComplete="off"
                          type="text"
                          placeholder="e.g. Web developer"
                          name="jobtitle"
                          onChange={handleChange}
                          value={values.jobtitle || ''}
                          className={`${errors.jobtitle && 'wrong-input'}`}
                          required
                        />
                        {
                          errors.jobtitle && (<Form.Text className="text-danger">{errors.jobtitle}</Form.Text>)
                        }
                      </Col>
                      <Col md={12} lg={6}>
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control
                          autoComplete="off"
                          type="text"
                          placeholder="PP"
                          name="company"
                          onChange={handleChange}
                          value={values.company || ''}
                          className={`${errors.company && 'wrong-input'}`}
                          required
                        />
                        {
                          errors.company && (<Form.Text className="text-danger">{errors.company}</Form.Text>)
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
                      <Col md={12} lg={12}>
                        <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea" rows={2}
                            autoComplete="off"
                            placeholder="Explain your role in 2-3 lines"
                            name="description"
                            onChange={handleChange}
                            value={values.description || ''}
                            className={`${errors.description && 'wrong-input'}`}
                            required
                          />
                          {
                          errors.description && (<Form.Text className="text-danger">{errors.description}</Form.Text>)
                          }
                      </Col>
                    </Row>
                  </Form.Group>
                  <button type="submit" className="custom-button primary-button">Add Experience</button>
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

export default ExperienceForm