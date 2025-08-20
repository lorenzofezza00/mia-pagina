// ContactPage.jsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaEnvelope, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

const contacts = [
  {
    type: 'Email',
    value: 'your.email@example.com',
    icon: <FaEnvelope />,
    link: 'mailto:your.email@example.com',
    color: '#D44638',
  },
  {
    type: 'LinkedIn',
    value: 'your-linkedin-profile',
    icon: <FaLinkedin />,
    link: 'https://www.linkedin.com/in/your-linkedin-profile/',
    color: '#0077B5',
  },
  {
    type: 'Instagram',
    value: '@yourinstagram',
    icon: <FaInstagram />,
    link: 'https://www.instagram.com/yourinstagram/',
    color: '#E1306C',
  },
  {
    type: 'Facebook',
    value: 'your-facebook-profile',
    icon: <FaFacebook />,
    link: 'https://www.facebook.com/your-facebook-profile/',
    color: '#1877F2',
  },
];

const ContactPage = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-5" style={{ color: 'white' }}>Get in Touch</h1>
      <Row className="g-4 justify-content-center">
        {contacts.map((contact, idx) => (
          <Col key={idx} xs={12} sm={6} md={4} lg={3}>
            <Card className="text-center h-100 shadow-sm" style={{ borderTop: `5px solid ${contact.color}` }}>
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
