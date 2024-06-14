import React from "react";
import Home from "../components/Home";
import Movies from "../components/Movies";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import NabvarIn from "../components/NavbarIn";
import Promotion from "../components/Promotion";
import "bootstrap/dist/css/bootstrap.min.css";

const Cine = () => {
  return (
    <div>
      <NabvarIn />
      <Home />
      <Movies />
      <Promotion />
      <Contact />
      <Footer />
    </div>
  );
};

export default Cine;
