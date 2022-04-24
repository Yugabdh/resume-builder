import React from 'react';
import Col from 'react-bootstrap/Col';

const Content = (props) => props.features.map((feature) => {
  return (
    <Col sm={12} md={4} lg={4} className="py-3 px-0 px-sm-3 iconText" key={feature.id}>
      <div className="card h-100 shadow-lg text-center p-4">
        <img src={feature.img} alt={feature.heading} height="120" className="mb-3" />
        <h5 className={"font-weight-bold"}>{feature.heading}</h5>
        <p className={"mb-md-1 mb-sm-0 pt-3 px-3"}>
          {feature.info}
        </p>
      </div>
    </Col>
  );
});

export default Content;
