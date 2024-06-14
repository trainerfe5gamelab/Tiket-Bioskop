import React from "react";
import SeatGrid from "../components/SeatGrid";
import Footer from "../components/Footer";
import NabvarIn from "../components/NavbarIn";
import "bootstrap/dist/css/bootstrap.min.css";

const SeatBuy = () => {
  return (
    <div>
      <NabvarIn />
      <SeatGrid />
      <Footer />
    </div>
  );
};

export default SeatBuy;
