import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FullScreenLoaderComponent from '../FullScreenLoaderComponent';
import logoColor from '../../assets/img/png/logo.png';

const ProfileComponent = ({userProfile, user, loadingFromAPI}) => {
  return(
    <Container>
      <Row>
        <Col lg={12}>
        <div className="profile-wrapper">	
          <div className="profile p-3">
          <>
            {loadingFromAPI ? (
              <FullScreenLoaderComponent />
            ) : (
              <>
                <img src={userProfile? userProfile.profilePicUrl? userProfile.profilePicUrl:logoColor:logoColor} className="thumbnail" alt="profile" />
                {userProfile? <h3 className="name">{userProfile.firstName+' '+userProfile.lastName}</h3>: ''}
                {user? <p className="description">{user.email}</p>: ''}
                <Link to="/profile" className="custom-button primary-button">Edit Profile</Link>
              </>
            )}
          </>
          </div>
        </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileComponent;
