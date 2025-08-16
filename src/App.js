import React, { useEffect, useState, useRef } from 'react';
import MyNav from './items/MyNav';
import BackgroundNetwork from './items/BackgroundNetwork';
import HeroText from './items/HeroText';
import TrailSquares from './items/TrailSquares';
import IntroText from './items/IntroText';
import SentenceBoxes from './items/IntroText';
import Home from './items/Home'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <BackgroundNetwork /> {/* sfondo con particles */}
      
      <Router>
        {/* Navbar normale, scorre con la pagina */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <MyNav />
        </div>

        {/* Contenuto sopra lo sfondo */}
        <Container className="py-4" style={{ position: "relative", zIndex: 5 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} /> */}
          </Routes>
        </Container>

        {/* Altri elementi decorativi */}
        <TrailSquares />
      </Router>
    </div>
  );
}


export default App;