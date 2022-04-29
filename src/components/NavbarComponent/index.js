import React, { useState, useEffect, useCallback } from 'react';
import { useLogoutUser } from '../../hooks/useLogoutUser';

import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';

import { NavLink, Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import logoColor from '../../assets/img/svg/logo.svg';
import logoWhite from '../../assets/img/svg/logo.svg';

const NavbarComponent = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const {
    logoutUser
  } = useLogoutUser(handleSignOut);

  function handleSignOut() {
    try {
      navigate("/", { replace: true });
    } catch {
      navigate("/", { replace: true });
    }
  }

  const [scrollNav, setScrollNav] = useState(false);
  const transparent = useSelector((state) => state.navbarTransparent.transparent);

  const changeNav = useCallback(() => {
    if (transparent) {
      if (window.scrollY >= 80) {
        setScrollNav(true);
      } else {
          setScrollNav(false);
      }
    }
  }, [transparent]);

  useEffect(() => {
      window.addEventListener('scroll', changeNav);
  }, [changeNav]);

  const DisplayIfCurrentUser = ({children}) => {
    return (
      user ? children: ''
    );
  }

  const NotDisplayIfCurrentUser = ({children}) => {
    return (
      !user ? children: ''
    );
  }

  return (
    <Navbar bg="light" variant="light" expand="lg" fixed="top" className={`${scrollNav || !transparent ? "" : "scrollNav"}`} onToggle={()=>setScrollNav(true)} collapseOnSelect={true}>
      <Container>
        <Navbar.Brand as={Link} to={`${!user ? "/" : "/dashboard"}`}>
          <img
            src={scrollNav || !transparent ? logoColor : logoWhite}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="logo"
          />
          <span className="brand-name">Magic Resume</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NotDisplayIfCurrentUser>
                <Nav.Link as={NavLink} to="/login" href="/login">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register" href="/register">Register</Nav.Link>
              </NotDisplayIfCurrentUser>
              <DisplayIfCurrentUser>
                <Nav.Link as={NavLink} to="/dashboard" href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={NavLink} to="/template-generate" href="/template-generate">Generate Template</Nav.Link>
                <Nav.Link as={NavLink} to="/profile" href="/profile">Profile</Nav.Link>
                <Nav.Link as={NavLink} to="/education" href="/education">Education</Nav.Link>
                <Nav.Link as={NavLink} to="/experience" href="/experience">Experience</Nav.Link>
                <Nav.Link as={NavLink} to="/other-details" href="/other-details">Other Details</Nav.Link>
              </DisplayIfCurrentUser>
              <Nav.Link as={NavLink} to="/faq" href="/faq">FAQ</Nav.Link>
            </Nav>
            <Nav>
              <DisplayIfCurrentUser>
                <button className="custom-button primary-button" onClick={ logoutUser }>Log out</button>
              </DisplayIfCurrentUser>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
