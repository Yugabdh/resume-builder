import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import VerticalCenteredModalComponent from '../../components/VerticalCenteredModalComponent/';
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
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

  function login() {
    console.log('No errors, submit callback called!');
  }

  return (
    <>
    <Form onSubmit={ handleSubmit } noValidate>
      <Form.Group className="mb-3">
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

      <button type="submit" className="primary-button button-lg" >Sign In</button>

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