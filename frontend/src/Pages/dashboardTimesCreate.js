import React from "react";
import Create from "../components/dashboard/times/create";
import Sidebar from "../components/dashboard/leyouts/sidebar";
import Header from "../components/dashboard/leyouts/header";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const TimesCreate = () => {
  return (
    <div>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="container-fluid">
          <Create />
        </div>
      </div>
    </div>
  );
};

export default TimesCreate;
