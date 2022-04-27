import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { makeVisible } from '../../redux/navbarTransparent';

import ExperienceForm from './ExperienceForm';
import CardComponentWithHeading from '../../components/CardComponentWithHeading';

const ExperiencePage = () => {
  const dispatch = useDispatch();

  // trigger on component mount
  useEffect(() => {
    dispatch(makeVisible());
  }, [dispatch]);

  const experienceForm = <ExperienceForm />;

  return(
    <section className="education-page">
      <CardComponentWithHeading heading={<h3 className="card-heading">Work Experience</h3>} children={experienceForm} />
    </section>
  );
};

export default ExperiencePage;
