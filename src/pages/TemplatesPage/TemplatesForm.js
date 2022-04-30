import React, { useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';

import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import t1 from './T1.png';
import t2 from './T2.png';

import {StanfordTemplate} from '../../components/TemplatesComponents/StanfordTemplate';
import {HarvardTemplate} from '../../components/TemplatesComponents/HarvardTemplate';

import {
  db,
} from '../../firebase';

import {
  addDoc,
  collection,
} from "firebase/firestore";

const TemplatesForm = ({user, profile, education, experience, achivements, interests, languages, skills}) => {
  const itemsRef = useRef([1, 2]);

  const [show, setShow] = useState(false);
  const [documentName, setDocumentName] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [error, setError] = useState("");
  const handleClose = () => setShow(false);

  const printClickAfter = (templateName) => {
    setTemplateName(templateName);
    setShow(true);
  }

  const handleSave = (event) => {
    if (event) event.preventDefault();
    if (templateName && templateName.length !== 0) {
      setError("");
      console.log({
        profile: {
          ...profile
        },
        education: education.length >0?[ ...education]:[],
        experience: experience.length >0?[...experience]:[],
        achivements: achivements.length >0?[...achivements]:[],
        interests: interests.length >0?[...interests]:[],
        languages: languages.length >0?[...languages]:[],
        skills: skills.length >0?[...skills]:[],
        template: templateName,
        documentName: documentName,
      });
      addDoc(collection(db, "users/"+user.uid+"/resumes"), {
        profile: {
          ...profile
        },
        education: education.length >0?[ ...education]:[],
        experience: experience.length >0?[...experience]:[],
        achivements: achivements.length >0?[...achivements]:[],
        interests: interests.length >0?[...interests]:[],
        languages: languages.length >0?[...languages]:[],
        skills: skills.length >0?[...skills]:[],
        template: templateName,
        documentName: documentName,
      }).then(() => {
        console.log("Document saved")
      }).finally(() => {
        setTemplateName("");
        setShow(false);
      });
    } else {
      setError("Please enter resume name")
    }
  }

  const handleChange = (event) => {
    event.persist();
    setDocumentName(event.target.value);
  }

  return (
    <Container>
      <Row>
        <Col md={12} lg={4}>
          <div className="template-option-wrapper">
            <div className="image-wrapper text-center">
              <img src={t1} className="img-fluid img-thumbnail" alt="template 1" />
            </div>
            <div className="template-select-button text-center pt-2">
            <p>Stanford</p>
            <ReactToPrint
              trigger={() => <button className="custom-button primary-button" data-template="t1">Print this out!</button>}
              content={() => {
                return itemsRef.current[0];
              }}
              onAfterPrint={() => printClickAfter('Stanford')}
            />
            </div>
          </div>
        </Col>
        <Col md={12} lg={4}>
          <div className="template-option-wrapper">
            <div className="image-wrapper text-center">
              <img src={t2} className="img-fluid img-thumbnail" alt="template 1" />
            </div>
            <div className="template-select-button text-center pt-2">
            <p>Harvard</p>
            <ReactToPrint
              trigger={() => <button className="custom-button primary-button" data-template="t1">Print this out!</button>}
              content={() => {
                return itemsRef.current[1];
              }}
              onAfterPrint={() => printClickAfter("Harvard")}
            />
            </div>
          </div>
        </Col>
      </Row>
      <div style={{ display: "none" }}>
        <StanfordTemplate ref={(el) => (itemsRef.current[0] = el)} 
          profile={profile}
          education={education}
          experience={experience}
          achivements={achivements}
          interests={interests}
          languages={languages}
          skills={skills} />
        <HarvardTemplate ref={(el) => (itemsRef.current[1] = el)} 
          profile={profile}
          education={education}
          experience={experience}
          achivements={achivements}
          interests={interests}
          languages={languages}
          skills={skills} />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Want To Save This Template?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form  onSubmit={ handleSave }>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Template Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="My Resume"
                value={documentName}
                autoFocus
                required={true}
                onChange={handleChange}
              />
              {error}
            </Form.Group>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default TemplatesForm;