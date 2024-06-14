import React from 'react';
import './ProfileCard.css'

const MadCard = ({ image, name, role }) => {
  return (
    <div className="col-md-4">
      <hr />
      <div className="profile-card-2">
        <img src={image} className="img img-responsive" alt={name} />
        <div className="profile-name">{name}</div>
        <div className="profile-role">{role}</div>
        <div className="profile-icons">
          <a href="#"><i className="fa fa-facebook"></i></a>
          <a href="#"><i className="fa fa-twitter"></i></a>
          <a href="#"><i className="fa fa-linkedin"></i></a>
        </div>
      </div>
    </div>
  );
};

export default MadCard;
