import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectUser } from '../../redux/userSlice';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import VerticalCenteredModalComponent from '../../components/VerticalCenteredModalComponent/';

const ProfileForm = () => {
  const dispatch = useDispatch();
  // Modal states
  const [modalData, setModalData] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const user = useSelector(selectUser);

  // Form inputs
  const [values, setValues] = useState({
    formFirstName: user.displayName.split(' ')[0],
    formLastName: user.displayName.split(' ')[1],
    formage: 18,
    formGender: '',
  });

  // Errors values for input
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFirebase = useCallback(() => {
    console.log('called')
    const firstName = values.formFirstName;
    const lastName = values.formLastName;
    const age = values.formage;
    const gender = values.formGender;
    // dispatch(updateUserData({firstName, lastName, age, gender}));

    setModalData({
      title: "Profile updated",
        message: "Profile updated successfully.",
        classname: "sucess"
    });
    setModalShow(true);

  }, [values, dispatch]);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      setIsSubmitting(false);
      updateFirebase();
    }
  }, [errors, isSubmitting, updateFirebase]);

  function validate(values) {
    let errors = {};
    if (!values.formFirstName) {
      errors.formFirstName = "Firstname is required.";
    }
    if (!values.formLastName) {
      errors.formLastName = "Lastname is required.";
    }
    if (!values.formage) {
      errors.formage = "Age is required.";
    } else if (values.formage <= 0) {
      errors.formage = "Please enter proper age.";
    }
    if (!values.formGender) {
      errors.formGender = "Gender is required.";
    }
    return errors;
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  return (
    <>
    <Form onSubmit={ handleSubmit } noValidate>
      <Form.Group className="mb-3">
        <Row>
          <Col md={12} lg={6}>
            <Form.Label>Firstname</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
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
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
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
          <Col md={12} lg={6}>
            <Form.Label>Age</Form.Label>
            <Form.Control
              autoComplete="off"
              type="number"
              placeholder="Age"
              name="formage"
              onChange={handleChange}
              value={values.formage || ''}
              className={`${errors.formage && 'wrong-input'}`}
              required
            />
            {
            errors.formage && (<Form.Text className="text-danger">{errors.formage}</Form.Text>)
            }
            
          </Col>
          <Col md={12} lg={6}>
            <Form.Label>Gender</Form.Label>
            <Form.Select
              aria-label="Select gender"
              autoComplete="off"
              name="formGender"
              onChange={handleChange}
              value={values.formGender || ''}
              className={`${errors.formGender && 'wrong-input'} form-select-custom`}
              required
            >
              <option>Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Select>
            {
            errors.formGender && (<Form.Text className="text-danger">{errors.formGender}</Form.Text>)
            }
            
          </Col>
        </Row>
      </Form.Group>

      <button type="submit" className="custom-button primary-button button-lg">Update profile</button>

      {/* This modal will show up on error or otp send */}
      <VerticalCenteredModalComponent
        data={modalData}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Form>
    </>
  );
};

export default ProfileForm;