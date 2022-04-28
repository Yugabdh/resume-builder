import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { makeVisible } from '../../redux/navbarTransparent';

import SkillsForm from './SkillsForm';
import InterestsForm from './InterestsForm';
import AchievementsForm from './AchievementsForm';
import KnownLanguagesForm from './KnownLanguagesForm';
import CardComponentWithHeading from '../../components/CardComponentWithHeading';

const OtherDetailsPage = () => {
  const dispatch = useDispatch();

  // trigger on component mount
  useEffect(() => {
    dispatch(makeVisible());
  }, [dispatch]);

  const skillsForm = <SkillsForm />;
  const interestsForm = <InterestsForm />;
  const achievementsForm = <AchievementsForm />;
  const knownLanguagesForm = <KnownLanguagesForm />;

  return(
    <section className="other-page">
      <CardComponentWithHeading heading={<h3 className="card-heading">Skills</h3>} children={skillsForm} />
      <CardComponentWithHeading heading={<h3 className="card-heading">Intereset</h3>} children={interestsForm} />
      <CardComponentWithHeading heading={<h3 className="card-heading">Achievements</h3>} children={achievementsForm} />
      <CardComponentWithHeading heading={<h3 className="card-heading">Known Languages</h3>} children={knownLanguagesForm} />
    </section>
  );
};

export default OtherDetailsPage;
