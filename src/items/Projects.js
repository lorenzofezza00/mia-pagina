// PortfolioSection.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import HEZW from '../imgs/HomeEZW.png';

const projects = [
  {
    title: "EZWallet",
    description: "EZWallet is a web application designed to help individuals and families keep track of their expenses. Users can enter and categorize their expenses, allowing them to quickly see where their money is going. EZWallet is a powerful tool for those looking to take control of their finances and make informed decisions about their spending.",
    image: HEZW,
    link: "#"
  },
  {
    title: "Progetto 2",
    description: "Descrizione del progetto 2, le tecnologie usate e cosa fa.",
    image: "https://via.placeholder.com/300x200", // orizzontale
    link: "#"
  },
  {
    title: "Progetto 3",
    description: "Descrizione del progetto 3, le tecnologie usate e cosa fa.",
    image: "https://via.placeholder.com/200x400", // verticale
    link: "#"
  }
];

const ProjectCard = ({ project }) => {
  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = project.image;
    img.onload = () => {
      setIsVertical(img.height > img.width);
    };
  }, [project.image]);

  if (isVertical) {
    // layout orizzontale per immagini verticali
    return (
      <Card className="h-100 d-flex flex-row rounded-0"
      style={{ 
        color:'white',
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        border: "1px solid rgba(255,255,255,0.5)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        padding: "2rem"
      }}>
        <div style={{ width: "40%", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden",  padding: "10px"}}>
          <Card.Img
            src={project.image}
            style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
          />
        </div>
        <Card.Body style={{ width: "60%" }}>
          <Card.Title>{project.title}</Card.Title>
          <Card.Text>{project.description}</Card.Text>
          <Button variant="primary" href={project.link} target="_blank">
            Visualize
          </Button>
        </Card.Body>
      </Card>
    );
  }

  // layout normale per immagini orizzontali
  return (
    <Card className="h-100 rounded-0"
      style={{ 
        color:'white',
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        border: "1px solid rgba(255,255,255,0.5)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        padding: "2rem"
      }}>
      <div style={{ height: "200px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card.Img
          variant="top"
          src={project.image}
          style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
        />
      </div>
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
        <Card.Text>{project.description}</Card.Text>
        <Button variant="primary" href={project.link} target="_blank">
          Visualize
        </Button>
      </Card.Body>
    </Card>
  );
};

const Projects = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4" style={{ color: 'white' }}>Projects</h2>
      <Row>
        {projects.map((project, index) => (
          <Col md={4} key={index} className="mb-4">
            <ProjectCard project={project} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Projects;
