import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../redux/userSlice';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { makeVisible } from '../../redux/navbarTransparent';
import ProfileComponent from '../../components/ProfileComponent';

const DashboardPage = () => {
  const dispatch = useDispatch();

  // trigger on component mount
  useEffect(() => {
    dispatch(makeVisible());
  }, [dispatch]);

  const user = useSelector(selectUser);

  return(
    <section className="dashboard-section">
      <Container>
        <Row className="justify-content-center">
          <Col sm={12} lg={4}>
            <ProfileComponent user={user}/>
          </Col>
          <Col sm={12} lg={8} className="pt-5 pt-lg-0">
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DashboardPage;
