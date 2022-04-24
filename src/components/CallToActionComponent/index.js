import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

const CallToActionComponent = () => {
  return (
    <section className="call-to-action">
      <div className="d-flex justify-content-center align-items-center mask">
          <Container className="call-to-action-wrapper">
            <div className="call">
                <p className="call-text">Boost your chances of getting that job you've been dreaming of</p>
            </div>
            <div className="action"><Link to="/login" className="btn primary-button button-lg">Sign Up!</Link></div>
          </Container>
      </div>
    </section>
  );
};

export default CallToActionComponent;
