import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logoColor from '../../assets/img/png/logo.png';

const ProfileComponent = (props) => {
  return(
    <Container>
      <Row>
        <Col lg={12}>
        <div className="profile-wrapper">	
          <div className="profile p-3">
            <img src={logoColor} className="thumbnail" alt="profile" />
            {props.user? <h3 className="name">{props.user.displayName}</h3>: ''}
            <p className="description">{props.user.email}</p>
            <Link to="/profile" className="custom-button primary-button">Edit Profile</Link>
          </div>
        </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileComponent;
