import React, { useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./IntroAnimations.css";
import BackgroundNetwork from "./BackgroundNetwork";

const sentences = [
  <>
    This site is your gateway to learn more about me. Explore the{" "}
    <a href="#/about" style={{ color: "inherit", textDecoration: "underline" }}>About</a>,{" "}
    <a href="#/resume" style={{ color: "inherit", textDecoration: "underline" }}>Resume</a>,{" "}
    <a href="#/projects" style={{ color: "inherit", textDecoration: "underline" }}>Projects</a>, and{" "}
    <a href="#/contact" style={{ color: "inherit", textDecoration: "underline" }}>Contact</a> sections to discover the details of who I am and what I do.
  </>,
  "Each section tells a piece of my story, from my background and experiences to the projects that inspire me.",
  "Take your time to navigate through the pages — every click connects the dots and reveals more about my journey.",
  "Whether you’re curious about my work, my skills, or just want to see what I’m passionate about, there’s something here for you to explore.",
  "I invite you to dive in, interact, and uncover the story behind the ideas, the code, and the creativity that shape my world."
];

const SentenceBoxes = () => {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible"); // rimuove la classe quando esci
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
    <Container fluid className="p-0">
      <BackgroundNetwork />
      {sentences.map((sentence, index) => (
        <Row
          key={index}
          className="d-flex align-items-center"
          style={{ minHeight: "100vh", backgroundColor: "transparent" }}
        >
          <Col
            md={{ span: 6, offset: index % 2 === 0 ? 0 : 6 }}
            className={`text-${index % 2 === 0 ? "start" : "end"}`}
            // style={{ paddingLeft: "5rem", paddingRight: "5rem" }}
          >
            <div
            ref={(el) => (refs.current[index] = el)}
            className={`sentence-box ${index % 2 === 0 ? "from-left" : "from-right"}`}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255,255,255,0.3)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              padding: "2rem"
            }}
          >
            <p style={{ fontSize: "1.5rem", margin: 0 }}>{sentence}</p>
          </div>


          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default SentenceBoxes;
