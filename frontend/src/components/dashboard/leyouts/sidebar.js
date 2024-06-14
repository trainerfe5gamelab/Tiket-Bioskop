import React from "react";
import { useNavigate } from "react-router-dom";
import "../leyouts/sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className=" border-end" id="sidebar-wrapper">
      <div className="list-group list-group-flush">
        <button
          className="list-group-item list-group-item-action"
          onClick={() => navigate("/")}>
          <i class="bi bi-house"></i> <span className="text-sidebar">Home</span>
        </button>
        <button
          className="list-group-item list-group-item-action"
          onClick={() => navigate("/dashboard")}>
          <i class="bi bi-speedometer2"></i>{" "}
          <span className="text-sidebar">Dashboard</span>
        </button>
        <button
          className="list-group-item list-group-item-action"
          onClick={() => navigate("/dashboard/movie")}>
          <i class="bi bi-film"></i>
          <span className="text-sidebar"> Movies</span>
        </button>
        <button
          className="list-group-item list-group-item-action"
          onClick={() => navigate("/dashboard/promotion")}>
          <i class="bi bi-tags"></i>
          <span className="text-sidebar"> Promotion</span>
        </button>
        <button
          className="list-group-item list-group-item-action"
          onClick={() => navigate("/dashboard/transaction")}>
          <i class="bi bi-currency-dollar"></i>
          <span className="text-sidebar">Transaction</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
