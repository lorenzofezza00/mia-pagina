import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function MyNav() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        {/* Brand a sinistra */}
        <Navbar.Brand href="#home" className="fw-bold fs-3 fs-sm-4">
          Lorenzo Fezza
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Link allineati a destra */}
          <Nav className="ms-auto">
            <Nav.Link href="#home" className="fs-5 fs-sm-6">Home</Nav.Link>
            <Nav.Link href="#about" className="fs-5 fs-sm-6">About</Nav.Link>
            <Nav.Link href="#resume" className="fs-5 fs-sm-6">Resume</Nav.Link>

            <NavDropdown title={<span className="fs-5 fs-sm-6">Projects</span>} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1" className="fs-5 fs-sm-6">Project 1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" className="fs-5 fs-sm-6">Project 2</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3" className="fs-5 fs-sm-6">Project 3</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" className="fs-5 fs-sm-6">Project 4</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#contacts" className="fs-5 fs-sm-6">Contacts</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNav;
