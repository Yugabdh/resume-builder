import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import { selectAchievements, setUserAchievements } from '../../redux/userDetailsSlice';

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

import validate from './AchievementsFormValidationRules';

const AchievementsForm = () => {
  
  const dispatch = useDispatch();

  // getting state from store
  const user = useSelector(selectUser);
  const achivements = useSelector(selectAchievements);

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
  } = useForm(updateAchivements, validate);

  // Modal states
  const [modalData, setModalData] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const getDataFromFirebase = useCallback(async () => {
    if (achivements.length === 0) {
      setLoadingFromAPI(true);
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      getDocs(q)
        .then(docs => {
          if(docs.docs.length>0) {
            if(docs.docs[0].data().achivements) {
              dispatch(setUserAchievements([
                ...docs.docs[0].data().achivements
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

  async function updateAchivements() {
    setLoadingFromAPI(true);
    setDoc(doc(db, "users", user.uid), {
      achivements : [
        ...achivements,
        {
          ...values
        },
      ],
    }, { merge: true })
    .then(() => {
      dispatch(setUserAchievements([
        ...achivements,
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

  const deleteAchivement = async (event) => {
    let toDelete = parseInt(event.currentTarget.dataset.count);
    let temp = [];
    for(let i =0; i<achivements.length; i++) {
      if(toDelete !== i) {
        temp.push(achivements[i])
      }
    }
    setLoadingFromAPI(true);
    setDoc(doc(db, "users", user.uid), {
      achivements : [
        ...temp
      ],
    }, { merge: true })
    .then(() => {
      dispatch(setUserAchievements([
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
      setIsSubmitting(false);
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
                Array.isArray(achivements) ? achivements.map((item, idx) => (
                  <Accordion.Item eventKey={idx} key={idx}>
                    <Accordion.Header>{item.achivementTitle}</Accordion.Header>
                    <Accordion.Body className="course-body">
                      <button type="button" onClick={deleteAchivement} data-count={idx} className="course-delete-button"><MdDelete /></button>
                      <b className="course-degree">{item.achivementTitle}</b>
                      <p className="pt-2 course-period">{item.description}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                )): null
              }
              <Accordion.Item eventKey="0">
                <Accordion.Header>Add achivements</Accordion.Header>
                <Accordion.Body>
                <Form onSubmit={ handleSubmit } noValidate>
                  <Form.Group className="mb-3">
                    <Row>
                      <Col md={12} lg={6}>
                        <Form.Label>Achivement Title</Form.Label>
                        <Form.Control
                          autoComplete="off"
                          type="text"
                          placeholder="e.g. SIH Winner"
                          name="achivementTitle"
                          onChange={handleChange}
                          value={values.achivementTitle || ''}
                          className={`${errors.achivementTitle && 'wrong-input'}`}
                          required
                        />
                        {
                          errors.achivementTitle && (<Form.Text className="text-danger">{errors.achivementTitle}</Form.Text>)
                        }
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
                  <button type="submit" className="custom-button primary-button">Add achivements</button>
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
export default AchievementsForm;