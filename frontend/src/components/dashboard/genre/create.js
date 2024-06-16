import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useIsAdmin from "../../../services/isAdmin";

const AddGenre = () => {
  useIsAdmin();
  const [genre, setGenre] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const saveGenre = async (e) => {
    e.preventDefault();
    if (!genre) {
      setError("Please fill in all fields.");
      return;
    }

    const formData = {
      name_genre: genre,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/genre/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/dashboard/genre`);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors.join(" "));
      } else {
        console.error("There was an error saving the Genre:", error);
        setError("There was an error saving the Genre. Please try again.");
      }
    }
  };

  const closeForm = () => {
    navigate(`/dashboard/genre`);
  };

  return (
    <div className="container mt-5">
      <div className="card col-lg-8 mx-auto">
        <div className="card-body">
          <div className="d-flex justify-content-end">
            <button className="btn-close" onClick={closeForm}></button>
          </div>
          <form onSubmit={saveGenre}>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="form-group">
              <label htmlFor="name_genre">Name Genre</label>
              <input
                type="text"
                className="form-control mb-3"
                id="name_genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Name Genre"
                required
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddGenre;
