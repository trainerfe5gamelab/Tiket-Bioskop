import React from "react";
import Preview from "../components/dashboard/movie/preview";
import Sidebar from "../components/dashboard/leyouts/sidebar";
import Header from "../components/dashboard/leyouts/header";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const MoviePreview = () => {
  return (
    <div>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="container-fluid container-fluid-sidebar">
          <Preview />
        </div>
      </div>
    </div>
  );
};

export default MoviePreview;
