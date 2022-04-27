export default function validate(values) {
  let errors = {};
  if (!values.degree) {
    errors.degree = "Please enter degree";
  }
  if (!values.school) {
    errors.school = "Please enter school/ university name";
  }
  if (!values.startdate) {
    errors.startdate = "Please enter start date";
  } else if (values.startdate > new Date()) {
    errors.startdate = "Invalid start date";
  }
  if (!values.enddate && !values.enddatepresent) {
    errors.enddate = "Please enter start date";
  } else if (values.enddate > new Date() && !values.enddatepresent) {
    errors.enddate = "Invalid start date";
  }
  return errors;
}