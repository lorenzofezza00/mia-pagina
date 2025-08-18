import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function MyNav() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: 'transparent' }} data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Lorenzo Fezza</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Link allineati a destra */}
          <Nav className="ms-auto">
            <Nav.Link href="home">Home</Nav.Link>
            <Nav.Link href="about">About</Nav.Link>
            {/* In about ci metto anche instagram, linkedin, ecc ecc */}
            <Nav.Link href="resume">Resume</Nav.Link>

            <NavDropdown title={<span>Projects</span>} id="basic-nav-dropdown">
                <NavDropdown.Item href="action/3.1">Project 1</NavDropdown.Item>
                <NavDropdown.Item href="action/3.2">Project 2</NavDropdown.Item>
                <NavDropdown.Item href="action/3.3">Project 3</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="action/3.4">Project 4</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="contacts">Contacts</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}

export default MyNav;