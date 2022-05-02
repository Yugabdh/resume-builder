import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import useForm from '../../hooks/useForm';

import SectionComponent from '../SectionComponent/';

import {
  db,
} from '../../firebase';

import {
  addDoc,
  collection,
} from "firebase/firestore";

const Content = () => {

  const sendMail = () => {
    addDoc(collection(db, "mail"), {
      name: values.name,
      email: values.email,
      subject: values.subject? values.subject: '',
      message: values.message

    })
  }


  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Please enter name";
    }
    
    if (!values.message) {
      errors.message = "Please enter message";
    }

    if (!values.email) {
      errors.email = 'Please enter email address';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Please enter valid email address';
    }

    return errors;
  }
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(sendMail, validate);

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
          <Form className="contact-form" onSubmit={ handleSubmit } noValidate>
            <Form.Group>
            <div className="contact-form-wrapper">
                <div className="form-item contact-grid-2">
                  <div className="contact-grid-item name">
                    <Form.Control
                      autoComplete="off"
                      type="text"
                      placeholder="Name"
                      name="name"
                      onChange={handleChange}
                      value={values.name || ''}
                      className={`input-text ${errors.name && 'wrong-input'}`}
                      required
                    />
                    {
                    errors.name && (<Form.Text className="text-danger">{errors.name}</Form.Text>)
                    }
                  </div>
                  <div className="contact-grid-item email">
                    <Form.Control
                      autoComplete="off"
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                      value={values.email || ''}
                      className={`input-text ${errors.email && 'wrong-input'}`}
                      required
                    />
                    {
                    errors.email && (<Form.Text className="text-danger">{errors.email}</Form.Text>)
                    }
                  </div>
                </div>
                <div className="form-item contact-grid-1">
                  <div className="contact-grid-item">
                    <Form.Control
                      autoComplete="off"
                      type="text"
                      placeholder="subject"
                      name="subject"
                      onChange={handleChange}
                      value={values.subject || ''}
                      className={`input-text ${errors.subject && 'wrong-input'}`}
                      required
                    />
                    {
                    errors.subject && (<Form.Text className="text-danger">{errors.subject}</Form.Text>)
                    }
                  </div>
                </div>
                <div className="form-item contact-grid-1">
                  <div className="contact-grid-item">
                    <Form.Control
                      as="textarea" rows={6}
                      autoComplete="off"
                      placeholder="Message"
                      name="message"
                      onChange={handleChange}
                      value={values.message || ''}
                      className={`input-textarea ${errors.message && 'wrong-input'}`}
                      required
                    />
                    {
                    errors.message && (<Form.Text className="text-danger">{errors.message}</Form.Text>)
                    }
                  </div>
                </div>

                <div className="contact-grid-1">
                  <div className="button-borders">
                    <button type="submit" className="custom-button primary-button">
                      Send message !
                    </button>
                  </div>
                </div>
              </div>
            </Form.Group>
          </Form>
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
