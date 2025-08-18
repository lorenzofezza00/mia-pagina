// RightSentenceBoxes.js
import React, { useEffect, useRef } from "react";
import "./IntroAnimations.css";

const sentences = [
  "Growing up with a convent education taught me the value of altruism, openness, and curiosity.",
  "Music has always been a big part of my life: I studied piano for many years, and today I’m drawn to electronic music.",
  "After high school in Ortona, I moved to Turin for university, and with the support of scholarships, I earned my degree.",
  "I love my family and dream of turning my countryside house into a special place to share experiences, music, and creativity.",
];

const RightSentenceBoxes = () => {
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

  return (
    <div>
      {sentences.map((sentence, index) => (
        <div
          key={index}
          ref={(el) => (refs.current[index] = el)}
          className="sentence-box from-right"
          style={{
            height: "50vh", // ogni box occupa tutta l'altezza della finestra
            display: "flex",
            alignItems: "center", // centraggio verticale
            justifyContent: "flex-start",
            paddingLeft: "420px", // distanza dalla mappa
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
};

export default RightSentenceBoxes;
