import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Content from './Content';

const Services = (props) => {
  return (
    <Container className="services-wrapper">
      <Row className="justify-content-center">
        <Content features={props.features} />
      </Row>
    </Container>
  );
};

export default Services;
