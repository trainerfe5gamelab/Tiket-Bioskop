import React from "react";
import Profil from "../components/Profil";
import Footer from "../components/Footer";
import NabvarIn from "../components/NavbarIn";
import "bootstrap/dist/css/bootstrap.min.css";

const MyProfil = () => {
  return (
    <div>
      <NabvarIn />
      <Profil />
      <Footer />
    </div>
  );
};

export default MyProfil;
