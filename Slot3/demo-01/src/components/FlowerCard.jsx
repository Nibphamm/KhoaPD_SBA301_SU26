import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function FlowerCard({ image, title, subtitle }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img 
        variant="top" 
        src={image} 
        style={{ height: '300px', objectFit: 'cover' }} 
        alt={title}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title style={{ fontSize: '1rem', fontWeight: 'bold' }}>{title}</Card.Title>
        <Card.Text className="text-muted mb-3" style={{ fontSize: '0.85rem' }}>
          {subtitle}
        </Card.Text>
        <Button 
          variant="primary" 
          size="sm" 
          className="mt-auto align-self-start px-3"
        >
          Detail
        </Button>
      </Card.Body>
    </Card>
  );
}

export default FlowerCard;
