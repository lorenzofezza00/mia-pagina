// ContactPage.jsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { contactsData as contacts } from '../data/contactsData';

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
