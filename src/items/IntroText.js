import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import "./IntroAnimations.css";

const sentences = [
  "This site is your gateway to learn more about me. Explore the About, Resume, Projects, and Contact sections to discover the details of who I am and what I do.",
  "Each section tells a piece of my story, from my background and experiences to the projects that inspire me.",
  "Take your time to navigate through the pages — every click connects the dots and reveals more about my journey.",
  "Whether you’re curious about my work, my skills, or just want to see what I’m passionate about, there’s something here for you to explore.",
  "I invite you to dive in, interact, and uncover the story behind the ideas, the code, and the creativity that shape my world."
];

const Sentence = ({ text, isLeft }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Row className="my-4">
      <Col md={{ span: 6, offset: isLeft ? 0 : 6 }}>
        <p
          ref={ref}
          className={`intro-sentence ${inView ? (isLeft ? "fade-in-left" : "fade-in-right") : "hidden"}`}
        >
          {text}
        </p>
      </Col>
    </Row>
  );
};

const IntroText = () => {
  return (
    <Container className="my-5">
      {sentences.map((sentence, index) => (
        <Sentence key={index} text={sentence} isLeft={index % 2 === 0} />
      ))}
    </Container>
  );
};

export default IntroText;
