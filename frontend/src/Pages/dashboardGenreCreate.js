import React from "react";
import Create from "../components/dashboard/genre/create";
import Sidebar from "../components/dashboard/leyouts/sidebar";
import Header from "../components/dashboard/leyouts/header";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const GenreCreate = () => {
  return (
    <div>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="container-fluid container-fluid-sidebar">
          <Create />
        </div>
      </div>
    </div>
  );
};

export default GenreCreate;
