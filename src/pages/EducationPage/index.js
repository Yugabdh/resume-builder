import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { makeVisible } from '../../redux/navbarTransparent';

import EducationForm from './EducationForm';
import CardComponentWithHeading from '../../components/CardComponentWithHeading';

const EducationPage = () => {
  const dispatch = useDispatch();

  // trigger on component mount
  useEffect(() => {
    dispatch(makeVisible());
  }, [dispatch]);

  const educationForm = <EducationForm />;

  return(
    <section className="profile-page">
      <CardComponentWithHeading heading={<h3 className="card-heading">Education and Qualifications</h3>} children={educationForm} />
    </section>
  );
};

export default EducationPage;
