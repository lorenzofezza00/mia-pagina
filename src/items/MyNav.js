import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./MyNav.css"

function MyNav() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: 'transparent' }} data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Lorenzo Fezza</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Link allineati a destra */}
          <Nav className="ms-auto">
            <Nav.Link href="#/home">Home</Nav.Link>
            <Nav.Link href="#/about">About</Nav.Link>
            {/* In about ci metto anche instagram, linkedin, ecc ecc */}
            <Nav.Link href="/LorenzoFezza_CV.pdf" download>Resume</Nav.Link>

            <NavDropdown title={<span>Projects</span>} id="basic-nav-dropdown">
                <NavDropdown.Item className="nav-dropdown-item" href="#/project/3.0">All the projects</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item className="nav-dropdown-item" href="#/project/3.1">EZWallet</NavDropdown.Item>
                <NavDropdown.Item className="nav-dropdown-item" href="#/project/3.2">Screenshot Multi‑platform Application</NavDropdown.Item>
                <NavDropdown.Item className="nav-dropdown-item" href="#/project/3.3">Real Time Domain Adaptation For Semantic Segmentation</NavDropdown.Item>
                <NavDropdown.Item className="nav-dropdown-item" href="#/project/3.4">Exploring Sim‑to‑Real Transfer with Domain Randomization</NavDropdown.Item>
                <NavDropdown.Item className="nav-dropdown-item" href="#/project/3.5">Computational Intelligence</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item className="nav-dropdown-item" href="#/project/3.6">APSS Metrics for Fault Detection</NavDropdown.Item>
                <NavDropdown.Item className="nav-dropdown-item" href="#/project/3.9">Temporal Diversity</NavDropdown.Item>
                <NavDropdown.Item className="nav-dropdown-item" href="#/project/3.8">Multiple Fault Injection</NavDropdown.Item>
                <NavDropdown.Item className="nav-dropdown-item" href="#/project/3.9">Event Based Cameras</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#/contacts">Contacts</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}

export default MyNav;