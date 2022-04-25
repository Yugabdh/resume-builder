import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useForm from "../../hooks/useForm";

import { selectUser } from '../../redux/userSlice';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { BsFillCameraFill } from "react-icons/bs";
import VerticalCenteredModalComponent from '../../components/VerticalCenteredModalComponent/';
import logoColor from '../../assets/img/png/logo.png';

import validate from './ProfileFormValidationRules';
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const ProfileForm = () => {

  const user = useSelector(selectUser);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(updateProfile, validate);

  // location api key
  const [apiKey, setAPIKey] = useState();
  const [country, setCountry] = useState([123, 123]);
  const [stateNames, setStateNames] = useState([]);
  const [city, setCity] = useState([]);
  const [gettingAPIDate, setGettingAPIDate] = useState(false);

  useEffect(() => {
    fetch(
      `https://www.universal-tutorial.com/api/getaccesstoken`,
      {
        method: "GET",
        headers: new Headers({
          "Accept": "application/json",
          "api-token": "QFZCxL-P9DDVZzxIYTti85dbkTb-RZYqW4fG39dTvmeLJ9TCRmVj-UQSruPENKH3MCw",
          "user-email": "murtazamister1@gmail.com"
        })
      }
    )
      .then(res => res.json())
      .then(response => {
        setAPIKey(response.auth_token);
      })
      .catch(error => console.log(error));
      console.log(apiKey);
  }, [apiKey]);

  useEffect(() => {
    let unmounted = false;
    setGettingAPIDate(true);
    async function getCountry() {
      if (apiKey) {
        const response = await fetch(
          "https://www.universal-tutorial.com/api/countries",
          {
            method: 'GET',
            headers:{"Authorization": "Bearer " + apiKey,"Accept": "application/json"} 
          }
        )
        const data = await response.json();
        setCountry(data);
        if (!unmounted) {
          setGettingAPIDate(false);
        }
      }
      }
    getCountry();
    return () => {
      unmounted = true;
    };
  }, [apiKey]);

  useEffect(() => {
    let unmounted = false;
    setGettingAPIDate(true);
    async function getCountry() {
      if (apiKey) {
        const response = await fetch(
          'https://www.universal-tutorial.com/api/states/' + values.formCountry,
          {
            method: 'GET',
            headers:{"Authorization": "Bearer " + apiKey,"Accept": "application/json"} 
          }
        )
        const data = await response.json();
        setStateNames(data);
        if (!unmounted) {
          setGettingAPIDate(false);
        }
      }
      }
    getCountry();
    return () => {
      unmounted = true;
    };
  }, [apiKey, values.formCountry]);

  useEffect(() => {
    let unmounted = false;
    setGettingAPIDate(true);
    async function getCountry() {
      if (apiKey) {
        const response = await fetch(
          'https://www.universal-tutorial.com/api/cities/' + values.formState,
          {
            method: 'GET',
            headers:{"Authorization": "Bearer " + apiKey,"Accept": "application/json"} 
          }
        )
        const data = await response.json();
        setCity(data);
        if (!unmounted) {
          setGettingAPIDate(false);
        }
      }
      }
    getCountry();
    return () => {
      unmounted = true;
    };
  }, [apiKey, values.formState]);

  // Modal states
  const [modalData, setModalData] = useState({});
  const [modalShow, setModalShow] = useState(false);

  function updateProfile() {
    console.log('update profile');
    console.log(values);
  }

  // image state
  const [imageUrl, setImageUrl] = useState();
  const [imageStateIsUploading, setImageStateIsUploading] = useState(false);

  // update profile picture functionality
  const handleChangeProfilePicture = (event) => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      console.log(image);
      const storageRef = ref(storage, `profilePictures/${user.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
  
      uploadTask.on(
        "state_changed",
        snapshot => {
          switch (snapshot.state) {
            case 'running':
              setImageStateIsUploading(true);
              break;
          }
        },
        error => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              setModalData({
                title: "Error",
                message: "User doesn't have permission to access the object",
                classname: "error"
              });
              break;
            case 'storage/canceled':
              setModalData({
                title: "Error",
                message: "User canceled the upload",
                classname: "error"
              });
              break;
            case 'storage/unknown':
              setModalData({
                title: "Error",
                message: "Unknown error occurred, inspect error.serverResponse",
                classname: "error"
              });
              break;
            }
            setModalShow(true);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageStateIsUploading(false);
            setImageUrl(downloadURL);
            console.log('File available at', downloadURL);
          });
        }
      );
    }
  }

  return (
    <>
    <Form onSubmit={ handleSubmit } noValidate>
      <Form.Group className="mb-3">
        <Row>
          <Col md={12} lg={4}>
            <div className="profile p-3">
              <label htmlFor="fileToUpload">
                <div className={`profile-pic ${imageStateIsUploading ? "uploading" : ""}`} style={{backgroundImage: `url(${imageUrl ? imageUrl : logoColor})`}}>
                    <span><BsFillCameraFill /> &nbsp;{imageStateIsUploading ?  "Uploading...": "Edit"}</span>
                </div>
              </label>
              <Form.Control type="File" name="fileToUpload" id="fileToUpload" onChange={handleChangeProfilePicture}/>
            </div>
          </Col>
          <Col md={12} lg={8}>
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
                <Form.Label>Email Address</Form.Label>
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
              </Col>
              <Col md={12} lg={6}>
                <Form.Label>Contatct Number</Form.Label>
                <Form.Control
                  autoComplete="off"
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="Enter contact number"
                  name="formTelNumber"
                  value={values.formTelNumber || ''}
                  className={`${errors.formTelNumber && 'wrong-input'}`}
                  onChange={handleChange}
                  required
                  aria-describedby="formTelNumber"
                />
                {
                errors.formTelNumber && (<Form.Text className="text-danger">{errors.formTelNumber}</Form.Text>)
                }
              </Col>
              <Col md={12} lg={6}>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control 
                  type="date"
                  placeholder="Enter Date of Birth"
                  name="formDateOfBirth"
                  value={values.formDateOfBirth || ''}
                  className={`${errors.formDateOfBirth && 'wrong-input'}`}
                  onChange={handleChange}
                  required
                  aria-describedby="formDateOfBirth" 
                />
                {
                  errors.formDateOfBirth && (<Form.Text className="text-danger">{errors.formDateOfBirth}</Form.Text>)
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
          </Col>
          <Col md={12} lg={12}>
            <Form.Label>About me</Form.Label>
              <Form.Control
                as="textarea" rows={2}
                autoComplete="off"
                placeholder="Introduce yourself in 3-2 lines"
                name="formAboutme"
                onChange={handleChange}
                value={values.formAboutme || ''}
                className={`${errors.formAboutme && 'wrong-input'}`}
                required
              />
              {
              errors.formAboutme && (<Form.Text className="text-danger">{errors.formAboutme}</Form.Text>)
              }
          </Col>
          <Col md={6} lg={6}>
            <Form.Label>House number, Appartment name</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Enter house number, appartment name"
              name="formHouseNumber"
              onChange={handleChange}
              value={values.formHouseNumber || ''}
              className={`${errors.formHouseNumber && 'wrong-input'}`}
              required
            />
            {
            errors.formHouseNumber && (<Form.Text className="text-danger">{errors.formHouseNumber}</Form.Text>)
            }
          </Col>
          <Col md={6} lg={6}>
            <Form.Label>Street name</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Enter street name"
              name="formStreet"
              onChange={handleChange}
              value={values.formStreet || ''}
              className={`${errors.formStreet && 'wrong-input'}`}
              required
            />
            {
            errors.formStreet && (<Form.Text className="text-danger">{errors.formStreet}</Form.Text>)
            }
          </Col>
          <Col sm={6} md={6} lg={3}>
            <Form.Label>Country</Form.Label>
            <Form.Select
              aria-label="Select country"
              autoComplete="off"
              name="formCountry"
              onChange={handleChange}
              value={values.formCountry || ''}
              className={`${errors.formCountry && 'wrong-input'} form-select-custom`}
              required
              disabled={gettingAPIDate || !apiKey}
            >
              <option key='Country'>Country</option>
              {
              country.map((element) => (
                <option key={element.country_name} value={element.country_name}>
                  {element.country_name}
                </option>
              ))
              }
            </Form.Select>
            {
            errors.formCountry && (<Form.Text className="text-danger">{errors.formCountry}</Form.Text>)
            }
          </Col>
          <Col sm={6} md={6} lg={3}>
            <Form.Label>State</Form.Label>
            <Form.Select
              aria-label="Select state"
              autoComplete="off"
              name="formState"
              onChange={handleChange}
              value={values.formState || ''}
              className={`${errors.formState && 'wrong-input'} form-select-custom`}
              required
              disabled={gettingAPIDate || !apiKey || !values.formCountry}
            >
              <option key='State'>State</option>
              {
              stateNames.map((element) => (
                <option key={element.state_name} value={element.state_name}>
                  {element.state_name}
                </option>
              ))
              }
            </Form.Select>
            {
            errors.formState && (<Form.Text className="text-danger">{errors.formState}</Form.Text>)
            }
          </Col>
          <Col sm={6} md={6} lg={3}>
            <Form.Label>City</Form.Label>
              <Form.Select
                aria-label="Select city"
                autoComplete="off"
                name="formCity"
                onChange={handleChange}
                value={values.formCity || ''}
                className={`${errors.formCity && 'wrong-input'} form-select-custom`}
                required
                disabled={gettingAPIDate || !apiKey || !values.formCountry || !values.formState}
              >
                <option key='City'>City</option>
              {
              city.map((element) => (
                <option key={element.city_name} value={element.city_name}>
                  {element.city_name}
                </option>
              ))
              }
              </Form.Select>
              {
              errors.formCity && (<Form.Text className="text-danger">{errors.formCity}</Form.Text>)
              }
          </Col>
          <Col sm={6} md={6} lg={3}>
            <Form.Label>Zipcode</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Enter zipcode"
              name="formZipCode"
              value={values.formZipCode || ''}
              className={`${errors.formZipCode && 'wrong-input'}`}
              onChange={handleChange}
              required
              aria-describedby="formZipCode"
            />
            {
            errors.formZipCode && (<Form.Text className="text-danger">{errors.formZipCode}</Form.Text>)
            }
          </Col>
          <Col md={12} lg={6}>
            <Form.Label>LinkedIn</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Enter LinkedIn profile link"
              name="formLinkedIn"
              value={values.formLinkedIn || ''}
              className={`${errors.formLinkedIn && 'wrong-input'}`}
              onChange={handleChange}
              required
              aria-describedby="formLinkedIn"
            />
            {
            errors.formLinkedIn && (<Form.Text className="text-danger">{errors.formLinkedIn}</Form.Text>)
            }
          </Col>
          <Col md={12} lg={6}>
            <Form.Label>Website</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Enter website link"
              name="formWebsite"
              value={values.formWebsite || ''}
              className={`${errors.formWebsite && 'wrong-input'}`}
              onChange={handleChange}
              required
              aria-describedby="formWebsite"
            />
            {
            errors.formWebsite && (<Form.Text className="text-danger">{errors.formWebsite}</Form.Text>)
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