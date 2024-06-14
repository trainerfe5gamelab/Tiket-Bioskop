import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useIsAdmin from "../../../services/isAdmin";

const AddPicture = () => {
  useIsAdmin();
  const [namePicture, setNamePicture] = useState("");
  const [picture, setPicture] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id_movie } = useParams();

  const savePicture = async (e) => {
    e.preventDefault();
    if (!id_movie || !namePicture || !picture) {
      setError("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("id_movie", id_movie);
    formData.append("name_pictures", namePicture);
    formData.append("picture", picture);

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/picture/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/dashboard/movie/${id_movie}/picture`);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors.join(" "));
      } else {
        console.error("There was an error saving the picture:", error);
        setError("There was an error saving the picture. Please try again.");
      }
    }
  };

  const closeForm = () => {
    navigate(`/dashboard/movie/${id_movie}/picture`);
  };

  return (
    <div className="container mt-5">
      <div className="card col-lg-6 mx-auto">
        <div className="card-body">
          <div className="d-flex justify-content-end">
            <button className="btn-close" onClick={closeForm}></button>
          </div>
          <form onSubmit={savePicture}>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="form-group">
              <label htmlFor="namePicture">Name Picture</label>
              <input
                type="text"
                className="form-control mb-3"
                id="namePicture"
                value={namePicture}
                onChange={(e) => setNamePicture(e.target.value)}
                placeholder="Name Picture"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="picture">Picture</label>
              <input
                type="file"
                className="form-control mb-3"
                id="picture"
                onChange={(e) => setPicture(e.target.files[0])}
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

export default AddPicture;
