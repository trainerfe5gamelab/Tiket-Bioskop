import React from "react";
import Edit from "../components/dashboard/actor/edit";
import Sidebar from "../components/dashboard/leyouts/sidebar";
import Header from "../components/dashboard/leyouts/header";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ActorEdit = () => {
  return (
    <div>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="container-fluid">
          <Edit />
        </div>
      </div>
    </div>
  );
};

export default ActorEdit;
