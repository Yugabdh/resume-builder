import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HeroHeaderComponent = () => {
  return (
    <header className="view">
      <div className="d-flex justify-content-center align-items-center mask hero-header">
        <Container className="px-md-3 px-sm-0">
          <Row className="hero-header-content align-items-center">
            <Col md={12} lg={8}>
                <h1 className="hero-header-title"> <br /><span className="highlight">Magic Resume</span></h1>
                <p className="hero-header-description"><span>Magic Resume will help you build resume which will land you a job</span></p>
                <div className="hero-header-call-to-action">
                  <Link className="btn custom-button primary-button button-lg" to="/login">Create Resume</Link>
                </div>
            </Col>
            <Col md={12} lg={6} className="d-none d-lg-block"></Col>
          </Row>
        </Container>
      </div>
    </header>
  );
};

export default HeroHeaderComponent;
