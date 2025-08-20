import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Button } from "react-bootstrap";
import "./IntroAnimations.css";

const HighlightSentence = () => {
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    const elements = [];

    const getPerimeterPosition = () => {
      const side = Math.floor(Math.random() * 4);
      switch(side) {
        case 0: return { left: `${Math.random() * 100}%`, top: `0%` };
        case 1: return { left: `100%`, top: `${Math.random() * 100}%` };
        case 2: return { left: `${Math.random() * 100}%`, top: `100%` };
        case 3: return { left: `0%`, top: `${Math.random() * 100}%` };
      }
    };

    for (let i = 0; i < 12; i++) {
      const pos = getPerimeterPosition();
      const dx = (Math.random() - 0.5) * 200; // distanza movimento
      const dy = (Math.random() - 0.5) * 200;
      const duration = Math.random() * 3 + 3; // tra 3 e 6 secondi
      elements.push({
        type: Math.random() > 0.5 ? "note" : "star",
        left: pos.left,
        top: pos.top,
        dx,
        dy,
        color: `hsl(${Math.random() * 360}, 80%, 70%)`,
        size: Math.random() * 20 + 10,
        duration
      });
    }

    setFloatingElements(elements);
  }, []);

  return (
    <div className="highlight-animate" style={{ position: "relative" }}>
      Music and Art have always been a big part of my life: I studied piano for many years, and today I’m drawn to electronic music.
      {floatingElements.map((el, i) => (
        <div
          key={i}
          className="floating"
          style={{
            position: "absolute",
            left: el.left,
            top: el.top,
            '--dx': `${el.dx}px`,
            '--dy': `${el.dy}px`,
            color: el.color,
            fontSize: `${el.size}px`,
            animationDuration: `${el.duration}s`
          }}
        >
          {el.type === "note" ? "🎵" : "⭐"}
        </div>
      ))}
    </div>
  );
};


const sentences = [
  "I grew up with a convent education, which taught me the value of altruism, openness, and curiosity.",
   <HighlightSentence key="highlight" />,

  <>
    After high school in Ortona, I moved to Turin for university at{" "}
    <a href="https://www.polito.it/en" style={{ color: "inherit", textDecoration: "underline" }}>PoliTO</a>,{" "}
    and with the support of scholarships, I earned my bachelor and master degree in{" "}
    <a href="https://www.polito.it/en/education/master-s-degree-programmes/computer-engineering" style={{ color: "inherit", textDecoration: "underline" }}>computer engineering</a>.
  </>,
  "I also love traveling: I spent time in La Coruña for an Erasmus+ program and in Edinburgh for a study trip during high school, in addition to exploring countless places across Italy.",
  <>
    I love my family and dream of turning my countryside house into a special place to share experiences, music, and creativity.
    <div style={{ marginTop: "1rem" }}>
      <Button
        variant="primary"
        size="sm"
        href="https://www.paypal.com/pools/c/9hBPBLauM2"
        target="_blank"
        rel="noopener noreferrer"
      >
        Donate with PayPal
      </Button>
    </div>
  </>,
];

const RightSentenceBoxes = forwardRef((props, ref) => {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    refs.current.forEach((el) => el && observer.observe(el));

    return () => {
      refs.current.forEach((el) => el && observer.unobserve(el));
    };
  }, []);

  // Esponiamo refs al genitore
  useImperativeHandle(ref, () => ({
    getSentenceRef: (index) => refs.current[index],
  }));

  return (
    <div>
      {sentences.map((sentence, index) => (
        <div
          key={index}
          ref={(el) => (refs.current[index] = el)}
          className="sentence-box from-right"
          style={{
            height: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: "420px",
          }}
        >
          <div
            style={{
              maxWidth: "500px",
              padding: "1.5rem",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255,255,255,0.3)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              fontSize: "1.2rem",
            }}
          >
            {sentence}
          </div>
        </div>
      ))}
    </div>
  );
});

export default RightSentenceBoxes;
