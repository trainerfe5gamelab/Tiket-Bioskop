import React from "react";
import Edit from "../components/dashboard/promotion/edit";
import Sidebar from "../components/dashboard/leyouts/sidebar";
import Header from "../components/dashboard/leyouts/header";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const PromotionEdit = () => {
  return (
    <div>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="container-fluid container-fluid-sidebar">
          <Edit />
        </div>
      </div>
    </div>
  );
};

export default PromotionEdit;