import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SectionComponent from '../SectionComponent/';

const Content = () => {
  return (
    <Container className="contact-wrapper">
      <Row>
        <Col md={12} lg={6}>
          <div className="contact-item">
            <h5>Contact Number</h5>
            <p>+91 098 7654 321</p>
          </div>
          <div className="contact-item">
            <h5>Contact Address</h5>
            <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
          </div>
        </Col>
        <Col md={12} lg={6}>
          <form className="contact-form">
            <div className="contact-form-wrapper">
              <div className="form-item contact-grid-2">
                <div className="contact-grid-item name">
                  <input 
                  type="text" 
                  name="name"
                  size="40" 
                  className="input-text" 
                  aria-required="true" 
                  aria-invalid="false" 
                  placeholder="Name" />
                </div>
                <div className="contact-grid-item email">
                  <input 
                  type="email" 
                  name="email" 
                  size="40" 
                  className="input-text" 
                  aria-required="true" 
                  aria-invalid="false" 
                  placeholder="Email" />
                </div>
              </div>
              <div className="form-item contact-grid-1">
                <div className="contact-grid-item">
                  <input 
                  type="text" 
                  name="subject" 
                  size="40" 
                  className="input-text" 
                  aria-required="true" 
                  aria-invalid="false" 
                  placeholder="Subject (Optional)" />
                </div>
              </div>
              <div className="form-item contact-grid-1">
                <div className="contact-grid-item">
                  <textarea 
                  name="message" 
                  cols="40" rows="6" 
                  className="input-textarea" 
                  aria-invalid="false" 
                  placeholder="Message" 
                  style={{height: 262+'px'}} />
                </div>
              </div>

              <div className="contact-grid-1">
                <div className="button-borders">
                  <button className="custom-button primary-button">
                    Send message !
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

const ContactComponent = () => {
  const content = <Content />;

  return (
    <SectionComponent title="Contact us" content={content} />
  );
};

export default ContactComponent;
