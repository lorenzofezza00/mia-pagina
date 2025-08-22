// ContactPage.jsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaEnvelope, FaLinkedin, FaInstagram, FaFacebook, FaUniversity } from 'react-icons/fa';

const contacts = [
  {
    type: 'Email',
    value: 'lorenzo.fezza00@gmail.com',
    icon: <FaEnvelope />,
    link: 'mailto:lorenzo.fezza00@gmail.com',
    color: '#D44638',
  },
  {
    type: 'LinkedIn',
    value: 'Lorenzo Fezza',
    icon: <FaLinkedin />,
    link: 'https://www.linkedin.com/in/lorenzo-fezza-33aa122a6',
    color: '#0077B5',
  },
  {
    type: 'Instagram',
    value: '@schiuma_da_barbie',
    icon: <FaInstagram />,
    link: 'https://www.instagram.com/schiuma_da_barbie/',
    color: '#E1306C',
  },
  {
    type: 'PoliTO',
    value: 'Lorenzo Fezza',
    icon: <FaUniversity />,
    link: 'https://www.polito.it/personale?p=lorenzo.fezza',
    color: 'rgba(0, 43, 73, .9)',
  },
];

const ContactPage = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-5" style={{ color: 'white' }}>Get in Touch</h1>
      <Row className="g-4 justify-content-center">
        {contacts.map((contact, idx) => (
          <Col key={idx} xs={12} sm={6} md={4} lg={3}>
            <Card className="text-center h-100 shadow-sm" style={{ 
              color:'white',
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              border: "1px solid rgba(255,255,255,0.5)",
              borderTop: `5px solid ${contact.color}`,
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              padding: "2rem",
              borderRadius:"10px"
           }}>
              <Card.Body>
                <div style={{ fontSize: '2rem', color: contact.color }}>{contact.icon}</div>
                <Card.Title className="mt-3">{contact.type}</Card.Title>
                <Card.Text>{contact.value}</Card.Text>
                <Button
                  variant="outline-primary"
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Connect
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ContactPage;
