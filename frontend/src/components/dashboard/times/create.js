import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useIsAdmin from "../../../services/isAdmin";

const AddTimes = () => {
  useIsAdmin();
  const [dated, setDated] = useState("");
  const [hour, setHour] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const { id_movie } = useParams();
  const navigate = useNavigate();

  console.log(id_movie);
  const saveTimes = async (e) => {
    e.preventDefault();
    if (!dated || !hour || !price) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/time/create",
        {
          dated,
          hour,
          price,
          id_movie: id_movie,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/dashboard/movie/${id_movie}/times`);
    } catch (error) {
      console.error("There was an error saving the times:", error);
      setError("There was an error saving the times. Please try again.");
    }
  };

  const closeForm = () => {
    navigate(`/dashboard/movie/${id_movie}/times`); // Navigate to times route when close icon is clicked
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="container">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Add Times</h5>
            <button
              className="btn-close"
              aria-label="Close"
              onClick={closeForm}></button>
          </div>
          <div className="card-body">
            <form onSubmit={saveTimes}>
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="mb-3">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={dated}
                  onChange={(e) => setDated(e.target.value)}
                  placeholder="Date"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Hour</label>
                <input
                  type="time"
                  className="form-control"
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                  placeholder="Hour"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                  required
                />
              </div>

              <button type="submit" className="btn btn-success">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTimes;
