import React from 'react';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useForm from '../../hooks/useForm';
import validate from './RegisterFormValidationRules';

const RegisterForm = () => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(register, validate);

  function register() {
    console.log('No errors, submit callback called!');
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

      <button type="submit" className="primary-button button-lg">Register</button>
      <div className="d-flex justify-content-center pt-3 bottom-link">
        Alerdy Have account? {""}<Link to="/login"> Login here</Link>
      </div>
    </Form>
  );
};

export default RegisterForm;