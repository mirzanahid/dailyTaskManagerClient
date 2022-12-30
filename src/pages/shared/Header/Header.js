import React, { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';
import './Header.css'

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <Navbar expand="lg" className='navbar'>
      <Container>
        <Navbar.Brand className='logo'>Daily Task Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto navbar-items" >
            <NavLink to="/" >AddTask</NavLink>
            <NavLink to="/myTask" >MyTasks</NavLink>
            <NavLink to="/cTask" >Complete Tasks</NavLink>
            {
              user?.uid ?
                <Link to="/login" className='login-btn' onClick={logout}>Log Out</Link>
                :
                <Link to="/signup" className='login-btn' >Log In</Link>
            }


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;