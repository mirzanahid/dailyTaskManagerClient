import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import './Header.css'

const Header = () => {
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default Header;