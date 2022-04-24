export default function validate(values) {
  let errors = {};
  if (!values.formEmail) {
    errors.formEmail = 'Please enter email address';
  } else if (!/\S+@\S+\.\S+/.test(values.formEmail)) {
    errors.formEmail = 'Please enter valid email address';
  }
  if (!values.formPassword) {
    errors.formPassword = 'Please enter password';
  } else if (values.formPassword.length < 8) {
    errors.formPassword = 'Password must be 8 or more characters';
  }
  return errors;
};