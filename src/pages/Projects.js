// src/items/Projects.js
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { projectsData as projects } from '../data/projectsData';
import ProjectCard from '../components/ProjectCard';

const getRandomOffset = () => {
  const maxX = window.innerWidth / 3;
  const maxY = window.innerHeight / 3;
  return {
    x: Math.random() * 2 * maxX - maxX,
    y: Math.random() * 2 * maxY - maxY,
    scale: 0.7 + Math.random() * 0.3
  };
};

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offsets, setOffsets] = useState(projects.map(() => ({ x: 0, y: 0, scale: 0.9 })));

  let accumulatedDelta = 0;
  const SCROLL_STEP = 200;

  const handleWheel = (e) => {
    accumulatedDelta += e.deltaY;

    if (Math.abs(accumulatedDelta) >= SCROLL_STEP) {
      const nextIndex = accumulatedDelta > 0
        ? (currentIndex + 1) % projects.length
        : (currentIndex - 1 + projects.length) % projects.length;

      setCurrentIndex(nextIndex);
      setOffsets(projects.map(() => getRandomOffset()));

      accumulatedDelta = 0;
    }
  };

  let touchStartY = null;

  const handleTouchStart = (e) => {
    touchStartY = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (touchStartY === null) return;

    const touchEndY = e.touches[0].clientY;
    const delta = touchStartY - touchEndY;

    if (Math.abs(delta) > SCROLL_STEP / 2) { 
      const nextIndex = delta > 0
        ? (currentIndex + 1) % projects.length
        : (currentIndex - 1 + projects.length) % projects.length;

      setCurrentIndex(nextIndex);
      setOffsets(projects.map(() => getRandomOffset()));

      touchStartY = null; 
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
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

      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px',
        zIndex: 500
      }}>
        {projects.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: index === currentIndex ? 'white' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          />
        ))}
      </div>
    </Container>
  );
};

export default Projects;