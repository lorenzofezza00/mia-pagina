import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import HEZW from '../imgs/HomeEZW.png';
import SMPR from '../imgs/SMPR.jpg'

const projects = [
  {
    title: "EZWallet",
    description: "EZWallet is a web application designed to help individuals and families keep track of their expenses. Users can enter and categorize their expenses, allowing them to quickly see where their money is going. EZWallet is a powerful tool for those looking to take control of their finances and make informed decisions about their spending.",
    image: HEZW,
    // link: "#/project/3.1"
    link: "https://github.com/lorenzofezza00/EZWallet"
  },
  {
    title: "Screenshot Multi‑platform Application",
    description: "A cross-platform screen capture utility in Rust for Windows, macOS, and Linux. Capture custom screen areas with an intuitive interface, use customizable hotkeys, save in multiple formats (.png, .jpg, .gif) or copy to the clipboard. Includes annotation tools, a delay timer, configurable save locations, and multi-monitor support.",
    image: SMPR,
    // link: "#/project/3.2"
    link: "https://github.com/lorenzofezza00/Screenshot-Application"
  },
  {
    title: "Real Time Domain Adaptation For Semantic Segmentation",
    description: "Descrizione del progetto 3...",
    image: "https://via.placeholder.com/200x400",
    link: "#"
  },
  {
    title: "Exploring Sim‑to‑Real Transfer with Domain Randomization",
    description: "Descrizione del progetto 2...",
    image: "https://via.placeholder.com/300x200",
    link: "#"
  },
  {
    title: "Computational Intelligence",
    description: "Descrizione del progetto 2...",
    image: "https://via.placeholder.com/300x200",
    link: "#"
  },
  {
    title: "APSS Metrics for Fault Detection",
    description: "Descrizione del progetto 2...",
    image: "https://via.placeholder.com/300x200",
    link: "#"
  },
  {
    title: "Temporal Diversity",
    description: "Descrizione del progetto 2...",
    image: "https://via.placeholder.com/300x200",
    link: "#"
  },
  {
    title: "Multiple Fault Injection",
    description: "Descrizione del progetto 2...",
    image: "https://via.placeholder.com/300x200",
    link: "#"
  },
  {
    title: "Event Based Cameras",
    description: "Descrizione del progetto 2...",
    image: "https://via.placeholder.com/300x200",
    link: "#"
  },
  
  
];


const getRandomOffset = () => {
  const maxX = window.innerWidth / 3;
  const maxY = window.innerHeight / 3;
  return {
    x: Math.random() * 2 * maxX - maxX,
    y: Math.random() * 2 * maxY - maxY,
    scale: 0.7 + Math.random() * 0.3
  };
};

const ProjectCard = ({ project, isActive, offset }) => {
  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const ratio = img.naturalWidth / img.naturalHeight;
      setIsVertical(ratio < 1.2); // verticale se quasi quadrata o taller che wide
      console.log(project.title, img.naturalWidth, img.naturalHeight, ratio, ratio < 1.2 ? 'Verticale' : 'Orizzontale');
    };
    img.src = project.image;
  }, [project.image]);

  return (
    <motion.div
      layout
      animate={{
        x: isActive ? 0 : offset.x,
        y: isActive ? 0 : offset.y,
        scale: isActive ? 1 : offset.scale,
        opacity: isActive ? 1 : 0.2,
        zIndex: isActive ? 100 : 0
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{
        position: 'absolute',
        borderRadius: '0',
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.3)',
        border: "1px solid rgba(255,255,255,0.2)",
        backdropFilter: 'blur(8px)',
        padding: '1rem',
        color: 'white',
        display: 'flex',
        flexDirection: isVertical ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 'auto',
        height: 'auto',
        maxWidth: '45vw',
        maxHeight: project.title === "Screenshot Multi‑platform Application" ? '55vh' : '45vh', // qui
      }}
    >
      <div style={{
        flexShrink: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginRight: isVertical ? '1rem' : '0',
        marginBottom: isVertical ? '0' : '1rem'
      }}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: isVertical ? 'auto' : '100%',
            height: isVertical ? '100%' : 'auto',
            maxHeight: isVertical ? '40vh' : 'none',
            maxWidth: isVertical ? 'none' : '40vw',
            objectFit: 'contain',
            borderRadius: project.image === HEZW || project.image === HEZW ? '14px' : '0'
          }}
        />
      </div>
      <div style={{ flex: '1 1 auto', minWidth: 0 }}>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <Button variant="primary" href={project.link} target="_blank">
          Visualize
        </Button>
      </div>
    </motion.div>
  );
};



const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offsets, setOffsets] = useState(projects.map(() => ({ x: 0, y: 0, scale: 0.9 })));

  const handleScroll = (e) => {
    const nextIndex = e.deltaY > 0
      ? (currentIndex + 1) % projects.length
      : (currentIndex - 1 + projects.length) % projects.length;
    setCurrentIndex(nextIndex);

    // Aggiorna solo gli offset randomici quando scrolli
    setOffsets(projects.map(() => getRandomOffset()));
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [currentIndex]);

  return (
    <Container
      fluid
      style={{
        position: 'relative',
        height: '85vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          project={project}
          isActive={index === currentIndex}
          offset={offsets[index]}
        />
      ))}
    </Container>
  );
};

export default Projects;