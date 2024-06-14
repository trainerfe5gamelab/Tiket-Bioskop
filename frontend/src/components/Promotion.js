import React, { useState, useEffect } from "react";
import { Card, ModalFooter } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ticket from "../image/icon/ticket.jpg";
import snack from "../image/icon/snack.jpg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Promotion.css";
import { fetchPromo } from "../services/api"; // Import function from api.js
import { imageBest } from "../utils/utils"; // Import function from utils.js

const Promotion = () => {
  const [Promotions, setPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  useEffect(() => {
    const getPromotions = async () => {
      const promotionsData = await fetchPromo();
      setPromotions(promotionsData);
    };

    getPromotions();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleShow = (promo) => setSelectedPromotion(promo);
  const handleClose = () => setSelectedPromotion(null);

  return (
    <div id="promotion" className="promotion">
      <div className="promotion-heading">
        <h1>
          <b>Promotion</b>
        </h1>
        <div className="promotion-icon">
          <h1>
            <b>All</b>
          </h1>
          <img src={ticket} alt="Ticket Icon" />
          <img src={snack} alt="Snack Icon" />
        </div>
      </div>
      <div className="container">
        <Slider {...settings}>
          {Promotions.map((promo, index) => (
            <div key={index}>
              <Card
                className="promotion-card m-2 shadow"
                style={{ cursor: "pointer" }}
                onClick={() => handleShow(promo)}>
                <Card.Img
                  variant="top"
                  src={imageBest(promo.picture)}
                  alt={promo.title}
                  className="foto-promo"
                />
                <Card.Body className="card-promotion">
                  {promo.title.split("\n").map((line, idx) => (
                    <h3 key={idx}>{line}</h3>
                  ))}
                </Card.Body>
              </Card>
            </div>
          ))}
        </Slider>
      </div>

      {selectedPromotion && (
        <Modal show={true} onHide={handleClose} size="lg">
          <Modal.Header closeButton className=" card-costum">
            <Modal.Title>{selectedPromotion.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className=" card-costum">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  <img
                    src={imageBest(selectedPromotion.picture)}
                    alt={selectedPromotion.title}
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-6">
                  <h3>{selectedPromotion.title}</h3>
                  <p>{selectedPromotion.fill}</p>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#365260" }}></Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Promotion;
