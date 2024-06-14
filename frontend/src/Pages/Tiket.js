import React from "react";
import Tiket from "../components/Tiket";
import Footer from "../components/Footer";
import NabvarIn from "../components/NavbarIn";
import "bootstrap/dist/css/bootstrap.min.css";

const MyTiket = () => {
  return (
    <div>
      <NabvarIn />
      <Tiket />
      <Footer />
    </div>
  );
};

export default MyTiket;
