import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function About() {

  return (
    //style={{ position: 'relative', overflow: 'visible' }}>
    <Row> 
        <Card variant="dark" className="text-white" style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: '1.5rem',
                backgroundColor: 'rgba(33, 37, 41, 0.8)'
                }}>
                <Card.Body style={{ flex: 1, paddingRight: '2rem' }}>
                <Card.Title className="fw-bold fs-1" >About</Card.Title>
                <Row>
                    <Col>
                        <Card.Text sclassName="fw-bold fs-5">
                            Breve bio (chi sei, cosa fai, da dove vieni)


                        {/* I have recently completed my master’s degree in Computer Engineering LM‑32 (DM270) 
                        with experience in the field of applied Artificial Intelligence in Computer Vision and Robotics,
                        very versatile and open to software development and research. Currently, I am holding a research
                        scholarship at <a href="https://www.dauin.polito.it/" target="_blank" rel="noopener noreferrer">DAUIN (Politecnico di Torino)</a> aimed at studying specific mechanisms capable of guaranteeing
                        the reliability and security of complex systems based on Artificial Intelligence algorithms
                        (with a focus on Image Segmentation). */}
                        </Card.Text>
                    </Col>
                    <Col>
                        <Card bg="dark" variant="dark" className="text-white" style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            maxWidth: '1000px',
                            // padding: '1rem',
                            borderRadius: '1.5rem',
                            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.6)',
                            // margin:'0.1rem'
                            }}>
                            <Card.Body style={{ flex: 1, paddingRight: '2rem' }}>
                            <Card.Title className="fw-bold fs-3" >Background</Card.Title>
                            <Card.Text sclassName="fw-bold fs-5">
                                {/* Like programming langueges known, projects, interests. Then I will make a link to my projects (sotto about) with a carousel of images related to the projects and if I click on it, the related page with the project opens. */}
                                (formazione, esperienze salienti)
                            </Card.Text>
                            <Button variant="primary" style={{ marginTop: '1.25rem' }} href="#projects">Projects</Button>  
                            </Card.Body>
                        </Card>
                    </Col>
                </Row> 
                <Row className="d-flex flex-column flex-lg-row flex-wrap justify-content-center">
                    <Card bg="dark" variant="dark" className="text-white m-3" style={{
                            flex: '1 1 300px',
                            borderRadius: '1.5rem',
                            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.6)',
                            maxWidth: '1000px'
                            }}>
                            <Card.Body>
                            <Card.Title className="fw-bold fs-5">Values</Card.Title>
                            <Card.Text className="fs-8">
                                I believe in teamwork, transparency, and continuous personal growth. Mutual respect and integrity guide my choices both professionally and personally.
                            </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card bg="dark" variant="dark" className="text-white m-3" style={{
                            flex: '1 1 300px',
                            borderRadius: '1.5rem',
                            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.6)',
                            maxWidth: '1000px'
                            }}>
                            <Card.Body>
                            <Card.Title className="fw-bold fs-5">Passions</Card.Title>
                            <Card.Text className="fs-8">
                                I'm passionate about programming, music, and design. I dedicate time to personal projects and exploring new technologies and programming languages.
                                Besides tech, I love traveling, exploring new cultures, and capturing meaningful and unforgettable moments. Every experience fuels my creativity.
                            </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card bg="dark" variant="dark" className="text-white m-3" style={{
                            flex: '1 1 300px',
                            borderRadius: '1.5rem',
                            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.6)',
                            maxWidth: '1000px'
                            }}>
                            <Card.Body>
                            <Card.Title className="fw-bold fs-5">Work Style</Card.Title>
                            <Card.Text className="fs-8">
                                I'm organized, punctual, and detail-oriented. I enjoy working in agile teams and contributing creative and efficient solutions to challenges.
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Row>
                </Card.Body>
        </Card>
    </Row>
  );
}

export default About;