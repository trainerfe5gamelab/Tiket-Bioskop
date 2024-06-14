import React from "react";
import Index from "../components/dashboard/movie/index";
import Sidebar from "../components/dashboard/leyouts/sidebar";
import Header from "../components/dashboard/leyouts/header";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const MyProfil = () => {
  return (
    <div>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="container-fluid">
          <Index />
        </div>
      </div>
    </div>
  );
};

export default MyProfil;
