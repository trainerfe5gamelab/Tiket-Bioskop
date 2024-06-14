import React from 'react';
import { Button } from 'react-bootstrap';
import './Seat.css';

const Seat = ({ seatNumber, isSelected, onSelect }) => {
  return (
    <Button
      className="seat-button"
      variant={isSelected ? "success" : "secondary"}
      onClick={() => onSelect(seatNumber)}
    >
      {seatNumber}
    </Button>
  );
};

export default Seat;
