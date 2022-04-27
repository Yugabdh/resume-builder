import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { makeVisible } from '../../redux/navbarTransparent';

import OtherDetailsForm from './OtherDetailsForm';
import CardComponentWithHeading from '../../components/CardComponentWithHeading';

const OtherDetailsPage = () => {
  const dispatch = useDispatch();

  // trigger on component mount
  useEffect(() => {
    dispatch(makeVisible());
  }, [dispatch]);

  const otherDetailsForm = <OtherDetailsForm />;

  return(
    <section className="profile-page">
      <CardComponentWithHeading heading={<h3 className="card-heading">Skills</h3>} children={otherDetailsForm} />
      <CardComponentWithHeading heading={<h3 className="card-heading">Intereset</h3>} children={otherDetailsForm} />
      <CardComponentWithHeading heading={<h3 className="card-heading">Achievements</h3>} children={otherDetailsForm} />
      <CardComponentWithHeading heading={<h3 className="card-heading">Known Languages</h3>} children={otherDetailsForm} />
    </section>
  );
};

export default OtherDetailsPage;
