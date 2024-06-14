import React from "react";
import useAdminAuth from "../../services/withAdminAuth";

function Index() {
  const user = useAdminAuth();

  if (!user) {
    return <div>Loading...</div>; // Opsional, status loading saat mengecek peran
  }
  return (
    <div className="container mt-3 d-flex justify-content-center">
      <div className="row row-cols-2 row-cols-lg-4">
        <div className="col">
          <div className="card m-1 text-bg-primary mb-3">
            <div className="card-header">
              <i class="bi bi-currency-dollar"></i> Transaction
            </div>
            <div className="card-body">
              <h3 className="card-title fw-bold">8000</h3>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card m-1 text-bg-secondary mb-3">
            <div className="card-header">Header</div>
            <div className="card-body">
              <h5 className="card-title">Secondary card title</h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card m-1 text-bg-success mb-3">
            <div className="card-header">Header</div>
            <div className="card-body">
              <h5 className="card-title">Success card title</h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card m-1 text-bg-danger mb-3">
            <div className="card-header">Header</div>
            <div className="card-body">
              <h5 className="card-title">Danger card title</h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card m-1 text-bg-warning mb-3">
            <div className="card-header">Header</div>
            <div className="card-body">
              <h5 className="card-title">Warning card title</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
