import React from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';

import MyNav from './items/MyNav';
import BackgroundNetwork from './items/BackgroundNetwork';
import TrailSquares from './items/TrailSquares';
import Home from './items/Home';
import About from './items/About';

function App() {
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* Sfondo con particles */}
      <BackgroundNetwork />

      <Router>
        {/* Navbar normale, scorre con la pagina */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <MyNav />
        </div>

        {/* Contenuto sopra lo sfondo */}
        <Container className="py-4" style={{ position: "relative", zIndex: 5 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/mia-pagina" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>

        {/* Altri elementi decorativi */}
        <TrailSquares />
      </Router>
    </div>
  );
}

export default App;
