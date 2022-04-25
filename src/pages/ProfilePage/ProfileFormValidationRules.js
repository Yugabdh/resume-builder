export default function validate(values) {
  let errors = {};
  if (!values.formFirstName) {
    errors.formFirstName = "Please enter firstname";
  }
  
  if (!values.formLastName) {
    errors.formLastName = "Please enter lastname";
  }

  if (!values.formEmail) {
    errors.formEmail = 'Please enter email address';
  } else if (!/\S+@\S+\.\S+/.test(values.formEmail)) {
    errors.formEmail = 'Please enter valid email address';
  }

  if (!values.formTelNumber) {
    errors.formTelNumber = "Please enter contact number";
  } else if (!/^[0-9]{10}$/.test(values.formTelNumber)) {
    console.log(values.formTelNumber);
    errors.formTelNumber = "Mobile number must have 10 digits";
  }


  if (!values.formDateOfBirth) {
    errors.formDateOfBirth = "Please enter Date of birth";
  } else if (values.formDateOfBirth > new Date()) {
    errors.formDateOfBirth = "Invalid Date of birth";
  }

  if (!values.formGender) {
    errors.formGender = "Please enter gender";
  }

  if (!values.formHouseNumber) {
    errors.formHouseNumber = "Please enter address";
  }

  if (!values.formStreet) {
    errors.formStreet = "Please enter address";
  }

  if (!values.formCountry) {
    errors.formCountry = "Please enter country";
  }

  if (!values.formState) {
    errors.formState = "Please enter state";
  }

  if (!values.formCity) {
    errors.formCity = "Please enter city";
  }

  if (!values.formZipCode) {
    errors.formZipCode = "Please enter zipcode";
  }


  return errors;
};