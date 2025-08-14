import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const HeroText = () => {
  return (
    <Container fluid className="vh-100 d-flex align-items-center">
      <Row className="w-100">
        <Col className="d-flex justify-content-end">
          <div style={{ textAlign: 'right', maxWidth: '600px' }}>
            <h1 style={{ fontSize: '3rem', margin: 0 }}>
              Hi, I’m Lorenzo Fezza —
            </h1>
            <p style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>
              follow the trail and connect the dots to explore my world.
            </p>
          </div>
        </Col>
      </Row>
      
    </Container>
  );
};

export default HeroText;
