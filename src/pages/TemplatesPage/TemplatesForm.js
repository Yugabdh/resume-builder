import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import t1 from './T1.png';

import {StandForTemplate} from '../../components/TemplatesComponents/StandFordTemplate';

const TemplatesForm = ({profile, education, experience, achivements, interests, languages, skills}) => {
  const itemsRef = useRef([1]);

  return (
    <Container>
      <Row>
        <Col md={12} lg={4}>
          <div className="template-option-wrapper">
            <div className="image-wrapper text-center">
              <img src={t1} className="img-fluid img-thumbnail" alt="template 1" />
            </div>
            <div className="template-select-button text-center pt-2">
            <ReactToPrint
              trigger={() => <button className="custom-button primary-button">Print this out!</button>}
              content={() => {
                return itemsRef.current[0];
              }}
            />
            </div>
          </div>
        </Col>
      </Row>
      <div style={{ display: "none" }}>
        <StandForTemplate ref={(el) => (itemsRef.current[0] = el)} 
          profile={profile}
          education={education}
          experience={experience}
          achivements={achivements}
          interests={interests}
          languages={languages}
          skills={skills} />
      </div>
    </Container>
  )
}

export default TemplatesForm;