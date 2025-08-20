// PortfolioSection.jsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const projects = [
  {
    title: "Progetto 1",
    description: "Descrizione del progetto 1, le tecnologie usate e cosa fa.",
    image: "https://via.placeholder.com/300x200",
    link: "#"
  },
  {
    title: "Progetto 2",
    description: "Descrizione del progetto 2, le tecnologie usate e cosa fa.",
    image: "https://via.placeholder.com/300x200",
    link: "#"
  },
  {
    title: "Progetto 3",
    description: "Descrizione del progetto 3, le tecnologie usate e cosa fa.",
    image: "https://via.placeholder.com/300x200",
    link: "#"
  }
];

const Projects = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4" style={{ color: 'white' }}>Projects</h2>
      <Row>
        {projects.map((project, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card>
              <Card.Img variant="top" src={project.image} />
              <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Card.Text>{project.description}</Card.Text>
                <Button variant="primary" href={project.link} target="_blank">
                  Visualize
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Projects;
