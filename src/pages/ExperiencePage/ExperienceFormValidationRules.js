export default function validate(values) {
  let errors = {};
  if (!values.jobtitle) {
    errors.jobtitle = "Please enter job title";
  }
  if (!values.company) {
    errors.company = "Please enter company name";
  }
  if (!values.description) {
    errors.description = "Please enter description";
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