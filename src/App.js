// import "./App.css";

// export default function MyApp() {
//   return (
//     <div className="App">
//       <h1>HELLO</h1>
//     </div>
//   );
// }

// App.js
// import React, { useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   useEffect(() => {
//     const cursors = [
//       "/cursors/Beeb.cur",
//       "/cursors/Cig.ani",
//       "/cursors/HannahMontana.cur",
//       "/cursors/RainbowDinosaaur.cur"
//     ];

//     const randomCursor = cursors[Math.floor(Math.random() * cursors.length)];

//     // Imposta il cursore globale
//     document.body.style.cursor = `url(${randomCursor}), auto`;
//   }, []);

//   return (
//     <div className="container">
//       <h1 className="mt-5">Ciao! Ho un cursore casuale 🎯</h1>
//       <p>Ricarica la pagina per vedere un nuovo cursore!</p>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState, useRef } from 'react';
import { Container, Row} from 'react-bootstrap';
import MyNav from './items/MyNav';
import BackgroundNetwork from './items/BackgroundNetwork';
import HeroText from './items/HeroText';
import TrailSquares from './items/TrailSquares';
import IntroText from './items/IntroText';
import SentenceBoxes from './items/IntroText';

function App() {
  const hiRef = useRef(null);
  const [randoms, setRandoms] = useState([]);
  const text = "Schiüma";
  // funzione per generare spostamenti casuali
  const randomOffset = () => ({
    transform: `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px) rotate(${Math.random() * 10 - 5}deg)`,
    display: 'inline-block',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Appare uno dopo l'altro
            for (let i = 0; i < 10; i++) {
              setTimeout(() => {
                const x = Math.random() * (window.innerWidth - 50);
                const y = Math.random() * (window.innerHeight - 50);
                setRandoms((prev) => [...prev, { id: Date.now() + i, x, y }]);
              }, i * 300);
            }
          } else {
            // Esci dal container -> cancella tutto
            setRandoms([]);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (hiRef.current) {
      observer.observe(hiRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    
    <div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 10,
        }}
      >
        <MyNav />
      </div>
      <div
        style={{
          height: "100vh",
          backgroundColor: "#121212",
          color: "#fff",
          transition: "all 0.3s ease",
        }}
      >
        <HeroText/>
      </div>

      <div
        style={{
          height: "100vh",
          color: "#fff",
          backgroundColor: "#121212",
          transition: "all 0.3s ease",
          position: "relative",
        }}
      >
        <div style={{ color: "#fff", backgroundColor: "#121212", position: "relative" }}>
          <SentenceBoxes/>
        </div>
      </div>
      <TrailSquares/>
      <BackgroundNetwork />
    </div>
  );
}

export default App;