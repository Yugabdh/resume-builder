import React from 'react';
import Services from './Services';
import SectionComponent from '../SectionComponent/';


import speed from '../../assets/img/svg/speed.svg';
import jobSearch from '../../assets/img/svg/job-search.svg';
import organise from '../../assets/img/svg/organize.svg';

const FeatureCardsComponent = () => {
  const features = [
    {
      id: 0,
      img: speed,
      heading: 'Quick and easy resume builder',
      info: 'With our online CV maker, it is simple for anyone to quickly create a professional CV. Enter your personal details and begin filling out your CV content. Finally, choose one of our available CV layouts, and download your CV.'
    },
    {
      id: 1,
      img: jobSearch,
      heading: 'More likely to land a job',
      info: 'With a representative and professional CV, you will stand out amongst all other applicants. You are also up to 65% more likely to be invited to an interview.'
    },
    {
      id: 2,
      img: organise,
      heading: 'Oragnize your applications',
      info: 'Often, it is important to be able to tailor your CV based on the job you wish to apply for. With CV maker, you can create and manage several different CVs in an organised way through your own personal account hub.'
    }
  ];

  const ServicesComponent = <Services features={features} />

  return (
    <SectionComponent title="Our Services" content={ServicesComponent} />
  );
};

export default FeatureCardsComponent;