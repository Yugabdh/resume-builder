export default function validate(values) {
  let errors = {};
  if (!values.achivementTitle) {
    errors.achivementTitle = "Please enter achivement title";
  }
  if (!values.description) {
    errors.description = "Please enter achivement title";
  }
  return errors;
}