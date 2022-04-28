export default function validate(values) {
  let errors = {};
  if (!values.data) {
    errors.data = "Please enter value";
  }
  return errors;
}