import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FullScreenLoaderComponent from '../FullScreenLoaderComponent';
import RadialProgressBarComponent from '../RadialProgressBarComponent';

const StatusDashboardComponent = ({loadingFromAPI, completion}) => {
  const completionState = new Set(completion);
  console.log(completionState.size);
  return (
    <Container>
      <Row>
        <Col lg={12}>
        <div className="profile-status-wrapper">	
          <div className="profile-status p-3">
          <>
            {loadingFromAPI ? (
              <FullScreenLoaderComponent />
            ) : (
              <>
                <Container>
                  <Row>
                    <Col md={12} lg={2} className="d-flex justify-content-center">
                      <RadialProgressBarComponent 
                        progress={parseInt(((completionState.size)/7)*100)}
                        size={120}
                        strokeWidth={10}
                        circleOneStroke='#b298dc'
                        circleTwoStroke='#a663cc'
                      />
                    </Col>
                    <Col md={12} lg={10}>
                      <Container className="profile-status-content">
                        <hr className="d-sm-none"/>
                        <h5>Status</h5>
                        <p>Basic Profile: {completionState.has("profile")?<span className="completed">Completed</span>: <span className="pending">Pending</span>}</p>
                        <p>Education Details: {completionState.has("education")?<span className="completed">Completed</span>: <span className="pending">Pending</span>}</p>
                        <p>Experience Details: {completionState.has("experience")?<span className="completed">Completed</span>: <span className="pending">Pending</span>}</p>
                        <p>Other Details: {completionState.has("achivements") && completionState.has("interests") && completionState.has("languages") && completionState.has("skills")?<span className="completed">Completed</span>: <span className="pending">Pending</span>}</p>
                      </Container>
                    </Col>
                  </Row>
                </Container>
              </>
            )}
          </>
          </div>
        </div>
        </Col>
      </Row>
    </Container>
  )
}

export default StatusDashboardComponent;