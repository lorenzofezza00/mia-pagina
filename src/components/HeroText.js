import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function HeroSection() {
  return (
    <Col style={{height: '80vh'}}>
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
      <Row className="w-100">
        <p style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>
          Scroll to explore
        </p>
      </Row>
    </Col>
  );
}


export default HeroSection;
