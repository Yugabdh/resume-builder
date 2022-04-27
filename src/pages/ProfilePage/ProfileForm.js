import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useForm from "../../hooks/useForm";
import CountryDropdown from './CountryDropDown';
import StateDropdown from './StateDropDown';
import CityDropDown from './CityDropDown';

import { selectUser } from '../../redux/userSlice';
import { selectProfile, setUserProfile } from '../../redux/userDetailsSlice';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { BsFillCameraFill } from "react-icons/bs";
import VerticalCenteredModalComponent from '../../components/VerticalCenteredModalComponent/';
import FullScreenLoaderComponent from '../../components/FullScreenLoaderComponent';
import logoColor from '../../assets/img/png/logo.png';

import validate from './ProfileFormValidationRules';
import {
  db,
} from '../../firebase';
import {
  query,
  getDocs,
  collection,
  where,
  setDoc,
  doc
 } from "firebase/firestore";
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const ProfileForm = () => {
  const dispatch = useDispatch();

  // getting state from store
  const user = useSelector(selectUser);
  const profile = useSelector(selectProfile);

  // checking if userDetails are fetched 
  // if not fetch them from Firebase

  // callback to reduce dependency
  const [loadingFromAPI, setLoadingFromAPI] = useState(true);
  const getDataFromFirebase = useCallback(async () => {
    if (!profile) {
      setLoadingFromAPI(true);
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      getDocs(q)
        .then(docs => {
          if(docs.docs.length>0) {
            dispatch(setUserProfile({
              ...docs.docs[0].data().profile
            }))
            setValues({
              formFirstName: docs.docs[0].data().profile.firstName,
              formLastName: docs.docs[0].data().profile.lastName,
              formEmail: docs.docs[0].data().profile.email,
              formTelNumber: docs.docs[0].data().profile.contact,
              formDateOfBirth: docs.docs[0].data().profile.dob? new Date(docs.docs[0].data().profile.dob).toISOString().substring(0,10): null,
              formGender: docs.docs[0].data().profile.gender,
              formAboutme: docs.docs[0].data().profile.aboutMe,
              formHouseNumber: docs.docs[0].data().profile.houseNumber,
              formStreet: docs.docs[0].data().profile.street,
              formCountry: docs.docs[0].data().profile.country,
              formState: docs.docs[0].data().profile.state,
              formCity: docs.docs[0].data().profile.city,
              formZipCode: docs.docs[0].data().profile.zipcode,
              formLinkedIn: docs.docs[0].data().profile.linkedIn,
              formWebsite: docs.docs[0].data().profile.website
            })
          }
        }).finally( () => {
          setLoadingFromAPI(false)
        }
        );
    } else {
      setValues({
        formFirstName: profile.firstName,
        formLastName: profile.lastName,
        formEmail: profile.email,
        formTelNumber: profile.contact,
        formDateOfBirth: profile.dob? new Date(profile.dob).toISOString().substring(0,10): null,
        formGender: profile.gender,
        formAboutme: profile.aboutMe,
        formHouseNumber: profile.houseNumber,
        formStreet: profile.street,
        formCountry: profile.country,
        formState: profile.state,
        formCity: profile.city,
        formZipCode: profile.zipcode,
        formLinkedIn: profile.linkedIn,
        formWebsite: profile.website
      })
    }
  }, []);

  useEffect(() => {
    getDataFromFirebase();
  }, [])

  const {
    values,
    setValues,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(updateProfile, validate);

  // location api key
  const [apiKey, setAPIKey] = useState();
  
  useEffect(() => {
    fetch(
      `https://www.universal-tutorial.com/api/getaccesstoken`,
      {
        method: "GET",
        headers: new Headers({
          "Accept": "application/json",
          "api-token": process.env.REACT_APP_LOCATION_API_ACCESS_TOKEN,
          "user-email": process.env.REACT_APP_LOCATION_API_EMAIL
        })
      }
    )
      .then(res => res.json())
      .then(response => {
        setAPIKey(response.auth_token);
      })
      .catch(error => console.log(error));
  }, []);

  // Modal states
  const [modalData, setModalData] = useState({});
  const [modalShow, setModalShow] = useState(false);

  async function updateProfile() {
    setDoc(doc(db, "users", user.uid), {
      profile : {
        firstName: values.formFirstName,
        lastName: values.formLastName,
        email: values.formEmail,
        contact: values.formTelNumber,
        dob: values.formDateOfBirth,
        gender: values.formGender,
        aboutMe: values.formAboutme? values.formAboutme: '',
        houseNumber: values.formHouseNumber,
        street: values.formStreet,
        country: values.formCountry,
        state: values.formState,
        city: values.formCity,
        zipcode: values.formZipCode,
        linkedIn: values.formLinkedIn,
        website: values.formWebsite,
      },
    }, { merge: true })
    .then(() => {
      dispatch(setUserProfile({
        firstName: values.formFirstName,
        lastName: values.formLastName,
        email: values.formEmail,
        contact: values.formTelNumber,
        dob: values.formDateOfBirth,
        gender: values.formGender,
        aboutMe: values.formAboutme? values.formAboutme: '',
        houseNumber: values.formHouseNumber,
        street: values.formStreet,
        country: values.formCountry,
        state: values.formState,
        city: values.formCity,
        zipcode: values.formZipCode,
        linkedIn: values.formLinkedIn,
        website: values.formWebsite,
      })
      )
    });
  }

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
            setDoc(doc(db, "users", user.uid), {
              profile : {
                profilePicUrl: downloadURL,
              },
            }, { merge: true }).then(() => {
              dispatch(setUserProfile({
                ...profile,
                profilePicUrl: downloadURL,
              })
              )
            });
            console.log('File available at', downloadURL);
          });
        }
      );
    }
  }

  return (
    <>
      {
        loadingFromAPI ? (
          <FullScreenLoaderComponent />
        ) : 
        (
          <>
            <Form onSubmit={ handleSubmit } noValidate>
              <Form.Group className="mb-3">
                <Row>
                  <Col md={12} lg={4}>
                    <div className="profile p-3">
                      <label htmlFor="fileToUpload">
                        <div className={`profile-pic ${imageStateIsUploading ? "uploading" : ""}`} style={{backgroundImage: `url(${profile.profilePicUrl ? profile.profilePicUrl : logoColor})`}}>
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
                    <CountryDropdown 
                      nameOfComponent="formCountry"
                      errors={errors}
                      values={values}
                      setValues={setValues}
                      apiKey={apiKey}
                    />
                    {
                    errors.formCountry && (<Form.Text className="text-danger">{errors.formCountry}</Form.Text>)
                    }
                  </Col>
                  <Col sm={6} md={6} lg={3}>
                    <Form.Label>State</Form.Label>
                    <StateDropdown 
                      nameOfComponent="formState"
                      errors={errors}
                      values={values}
                      setValues={setValues}
                      apiKey={apiKey}
                    />
                    {
                    errors.formState && (<Form.Text className="text-danger">{errors.formState}</Form.Text>)
                    }
                  </Col>
                  <Col sm={6} md={6} lg={3}>
                    <Form.Label>City</Form.Label>
                      <CityDropDown
                        nameOfComponent="formCity"
                        errors={errors}
                        values={values}
                        setValues={setValues}
                        apiKey={apiKey}
                      />
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
        )
      }
    </>
  );
};

export default ProfileForm;