// src/items/About.js
import React, { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import RightSentenceBoxes from '../components/RightSentenceBoxes';
import ScrollMap from '../components/ScrollMap';

function About() {
  const rightBoxesRef = useRef(null);
  
  useEffect(() => {
    window.scrollTo(0, 0); // forza lo scroll in alto
  }, []);

  return (
    <Container 
      fluid 
      className="text-light about-layout"
    >
      <div className="map-container">
        <ScrollMap sentence3Ref={rightBoxesRef} />
      </div>
      <div className="boxes-container">
        <RightSentenceBoxes ref={rightBoxesRef} />
      </div>
    </Container>
  );
}

export default About;