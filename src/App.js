import MyNav from "./items/MyNav";
import Welcome from "./items/Welcome";
import About from "./items/About";
import "./App.css";
import { Col, Container } from 'react-bootstrap';
import ProjectsCarousel from "./items/ProjectsCarousel";

export default function MyApp() {
  return (
    <div className="App" style={{ backgroundColor: '#121212', minHeight: '100vh', color: 'white' }}>
      <div style={{ height: "10vh", color: "white" }}>
        <MyNav/>
      </div>
      <div style={{ height: "90vh", color: "white" }}>
        <Container className="d-flex justify-content-center align-items-center h-100">
          <Welcome/>  
        </Container>
      </div>
      <section id="about">
        <div style={{ height: "90vh", color: "white" }}>
          <Container className="d-flex justify-content-center align-items-center h-100">
            <About/>
          </Container>
        </div>
      </section>
      <div style={{ height: "90vh", color: "white" }}>
          <Container className="d-flex justify-content-center align-items-center h-100">
            <Col>
              <h1>Projects</h1>
              <ProjectsCarousel/>
            </Col>  
          </Container>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '8rem'
      }}>
      </div>
    </div>
  );
}