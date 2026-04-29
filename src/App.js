import React from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';

// Layout Components
import MyNav from './components/layout/MyNav';
import BackgroundNetwork from './components/layout/BackgroundNetwork';
import TrailSquares from './components/layout/TrailSquares';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ContactPage from './pages/Contacts';
import NeuralNetVisualizer from './pages/Net';

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
            <Route path="/project/3.0" element={<Projects />} />
            <Route path="/contacts" element={<ContactPage />} />
            <Route path="/net" element={<NeuralNetVisualizer />} />
          </Routes>
        </Container>

        {/* Altri elementi decorativi */}
        <TrailSquares />
      </Router>
    </div>
  );
}

export default App;