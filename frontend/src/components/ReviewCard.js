import React from 'react';
import { Card } from 'react-bootstrap';

const ReviewCard = ({ name, date, rating, content }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
        <Card.Text>{content}</Card.Text>
        <div>
          {[...Array(5)].map((star, index) => (
            <span key={index} role="img" aria-label="star" style={{ color: index < rating ? 'yellow' : 'gray' }}>
              {index < rating ? '⭐' : '☆'}
            </span>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
