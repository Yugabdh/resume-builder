import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { BsGoogle } from "react-icons/bs";
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import useForm from '../../hooks/useForm';
import { useRegisterUser } from '../../hooks/useRegisterUser';
import { useLoginUser } from '../../hooks/useLoginUser';

import validate from './RegisterFormValidationRules';

import VerticalCenteredModalComponent from '../../components/VerticalCenteredModalComponent/';

const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(register, validate);

  const {
    submitting,
    usingPasswordSignUp,
    registerWithEmail,
  } = useRegisterUser(values, passCallback);

  const {
    usingGoogleSignUp,
    googleSignIn
  } = useLoginUser(values, passCallback);

  // Modal states
  const [modalData, setModalData] = useState({});
  const [modalShow, setModalShow] = useState(false);

  function passCallback(flag, msg) {
    if(flag) {
      setModalShow(flag);

      if (msg ==='Firebase: Error (auth/wrong-password).') {
        msg = 'Wrong password.'
      } else if (msg ==='Firebase: Error (auth/user-not-found).') {
        msg = 'This user is invalid.'
      } else if (msg ==='Firebase: Error (auth/invalid-email).') {
        msg = 'This email is invalid.'
      } else if (msg ==='Firebase: Error (auth/email-already-in-use).') {
        msg = 'The email already in use.'
      }
      setModalData({
        title: "Error",
        message: msg,
        classname: "error"
      });
    } else {
      if(msg === 'loggedIn') {
        navigate("/dashboard", { replace: true });
      }
    }
  }

  function register() {
    registerWithEmail();
  }
  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Form.Group className="mb-3">
        <Row>
          <Col md={12} lg={6}>
            <Form.Control
              autoComplete="off"
              type="text"
              pattern="[0-9]{10}"
              placeholder="Enter firstname"
              name="formFirstName"
              onChange={handleChange}
              value={values.formFirstName || ''}
              className={`${errors.formFirstName && 'wrong-input'}`}
              required
            />
            {
            errors.formFirstName && (<Form.Text className="text-danger">{errors.formFirstName}</Form.Text>)
            }
          </Col>
          <Col md={12} lg={6}>
            <Form.Control
              autoComplete="off"
              type="text"
              pattern="[0-9]{10}"
              placeholder="Enter lastname"
              name="formLastName"
              onChange={handleChange}
              value={values.formLastName || ''}
              className={`${errors.formLastName && 'wrong-input'}`}
              required
            />
            {
            errors.formLastName && (<Form.Text className="text-danger">{errors.formLastName}</Form.Text>)
            }
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formTelNumber">
      <Form.Control
          autoComplete="off"
          type="email"
          placeholder="Enter email address"
          name="formEmail"
          value={values.formEmail || ''}
          className={`${errors.formEmail && 'wrong-input'}`}
          onChange={handleChange}
          required
          aria-describedby="formEmail"
        />
        {
        errors.formEmail && (<Form.Text className="text-danger">{errors.formEmail}</Form.Text>)
        }
      </Form.Group>
      <Form.Group className="mb-3">
        <Row>
          <Col md={12} lg={6}>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="formPassword"
              onChange={handleChange}
              value={values.formPassword || ''}
              className={`${errors.formPassword && 'wrong-input'}`}
              id="formPassword"
              required
            />
            {
            errors.formPassword && (<Form.Text className="text-danger">{errors.formPassword}</Form.Text>)
            }
          </Col>
          <Col md={12} lg={6}>
            <Form.Control
              type="password"
              placeholder="Re-enter password"
              name="formPasswordRe"
              onChange={handleChange}
              value={values.formPasswordRe || ''}
              className={`${errors.formPasswordRe && 'wrong-input'}`}
              id="formPasswordRe"
              required
            />
            {
            errors.formPasswordRe && (<Form.Text className="text-danger">{errors.formPasswordRe}</Form.Text>)
            }
          </Col>
        </Row>
      </Form.Group>

      <hr />

      <button type="submit" className="custom-button primary-button button-lg" disabled={submitting || usingGoogleSignUp}>
        { usingPasswordSignUp? <Spinner animation="border" variant="light" size="sm" />: ""}Register
      </button>
      <button type="button" onClick={() => googleSignIn()} className="custom-button danger-button button-lg mt-2" disabled={submitting || usingGoogleSignUp}>
        { usingGoogleSignUp? <Spinner animation="border" variant="light" size="sm" />: ""}<BsGoogle /> &nbsp;with Google
      </button>
      <div className="d-flex justify-content-center pt-3 bottom-link">
        Have account? &nbsp;<Link to="/login"> Login here</Link>
      </div>
      {/* This modal will show up on error or otp send */}
      <VerticalCenteredModalComponent
        data={modalData}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Form>
  );
};

export default RegisterForm;