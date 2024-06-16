import React from "react";
import useAdminAuth from "../../services/withAdminAuth";

function Index() {
  const user = useAdminAuth();

  if (!user) {
    return <div>Loading...</div>; // Opsional, status loading saat mengecek peran
  }
  return (
    <div className="container mt-3 d-flex justify-content-center bg-dark">
      <h1>
        SELAMAT DATANG DI ADMIN CINE
        <span style={{ color: "green" }} className="fw-bold">
          PLEX+
        </span>{" "}
      </h1>
    </div>
  );
}

export default Index;
