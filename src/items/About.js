import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function About() {

  return (
    <Row>
        <Col>
            <h1>About</h1>
            <p> I have recently completed my master’s degree in Computer Engineering LM‑32 (DM270) 
                with experience in the field of applied Artificial Intelligence in Computer Vision and Robotics,
                very versatile and open to software development and research. Currently, I am holding a research
                scholarship at <a href="https://www.dauin.polito.it/" target="_blank" rel="noopener noreferrer">DAUIN (Politecnico di Torino)</a> aimed at studying specific mechanisms capable of guaranteeing
                the reliability and security of complex systems based on Artificial Intelligence algorithms
                (with a focus on Image Segmentation).
            </p>
        </Col>
        <Col>
            <Card bg="dark" variant="dark" className="text-white" style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                maxWidth: '1000px',
                padding: '2rem',
                borderRadius: '1.5rem',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.6)',
                margin:'2rem'
                }}>
                <Card.Body style={{ flex: 1, paddingRight: '2rem' }}>
                <Card.Title className="fw-bold fs-3" >Random tables about myself</Card.Title>
                <Card.Text sclassName="fw-bold fs-5">
                    Like programming langueges known, projects, interests. Then I will make a link to my projects (sotto about) with a carousel of images related to the projects and if I click on it, the related page with the project opens.
                </Card.Text>
                <Button variant="primary" style={{ marginTop: '1.25rem' }} href="#projects">Projects</Button>  
                </Card.Body>
            </Card>
        </Col>
    </Row>
  );
}

export default About;