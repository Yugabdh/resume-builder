import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import { BsGoogle } from "react-icons/bs";
import Spinner from "react-bootstrap/Spinner";

import VerticalCenteredModalComponent from '../../components/VerticalCenteredModalComponent/';

import useForm from "../../hooks/useForm";
import { useLoginUser } from '../../hooks/useLoginUser';

import validate from './LoginFormValidationRules';


const LoginForm = () => {
  const navigate = useNavigate();

  // Modal states
  const [modalData, setModalData] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(login, validate);

  const {
    submitting,
    usingPasswordSignIn,
    usingGoogleSignUp,
    loginWithEmail,
    googleSignIn,
  } = useLoginUser(values, passCallback);

  function login() {
    loginWithEmail();
  }

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

  return (
    <>
    <Form onSubmit={ handleSubmit } noValidate>
      <Form.Group className="mb-3">
        <Form.Control
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
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="formPassword"
          value={values.formPassword || ''}
          className={`${errors.formPassword && 'wrong-input'}`}
          onChange={handleChange}
          required
          aria-describedby="formPassword"
        />
        {
        errors.formPassword && (<Form.Text className="text-danger">{errors.formPassword}</Form.Text>)
        }
      </Form.Group>

      <hr />

      <button type="submit" className="custom-button primary-button button-lg" disabled={submitting || usingGoogleSignUp}>
        { usingPasswordSignIn? <Spinner animation="border" variant="light" size="sm" />: ""}Sign In
      </button>
      <button type="button" onClick={() => googleSignIn()} className="custom-button danger-button button-lg mt-2" disabled={submitting || usingGoogleSignUp}>
        { usingGoogleSignUp? <Spinner animation="border" variant="light" size="sm" />: ""}<BsGoogle /> &nbsp;with Google
      </button>

      {/* This modal will show up on error or otp send */}
      <VerticalCenteredModalComponent
        data={modalData}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div className="d-flex justify-content-center pt-3 bottom-link">
        <Link to="/register">Create an account !</Link>
      </div>
    </Form>
    
    
    </>
  );
};

export default LoginForm;