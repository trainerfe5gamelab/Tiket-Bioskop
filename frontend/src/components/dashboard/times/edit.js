import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useIsAdmin from "../../../services/isAdmin";

const EditTimes = () => {
  useIsAdmin();
  const [dated, setDated] = useState("");
  const [hour, setHour] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id, id_movie } = useParams();

  useEffect(() => {
    if (id) {
      getTimesById();
    }
  }, [id]);

  const updateTimes = async (e) => {
    e.preventDefault();
    if (!id_movie || !dated || !hour || !price) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/time/edit/${id}`,
        {
          id_movie,
          dated,
          hour,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/dashboard/movie/${id_movie}/times`);
    } catch (error) {
      console.log("There was an error updating the times:", error);
      setError("There was an error updating the times. Please try again.");
    }
  };

  const getTimesById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/time/${id}`);
      const timeData = response.data.time[0];
      setDated(formatDate(timeData.dated));
      setHour(timeData.hour);
      setPrice(timeData.price);
    } catch (error) {
      console.error("Error fetching times data:", error);
      alert("Failed to fetch times data");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const closeForm = () => {
    navigate(`/dashboard/movie/${id_movie}/times`); // Navigate to times route when close icon is clicked
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="container">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Edit Times</h5>
            <button
              className="btn-close"
              aria-label="Close"
              onClick={closeForm}></button>
          </div>
          <div className="card-body">
            <form onSubmit={updateTimes}>
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
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTimes;
