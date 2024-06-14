import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useIsAdmin from "../../../services/isAdmin";

const AddActor = () => {
  useIsAdmin();
  const [nameActor, setNameActor] = useState("");
  const [picture, setPicture] = useState(null);
  const [picturePreview, setPicturePreview] = useState(null);
  const [cast, setCast] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id_movie } = useParams();
  const token = localStorage.getItem("token"); // Get token from local storage

  const saveActor = async (e) => {
    e.preventDefault();
    if (!id_movie || !nameActor || !picture || !cast) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("id_movie", id_movie);
      formData.append("name_actor", nameActor);
      formData.append("picture", picture);
      formData.append("cast", cast);

      await axios.post("http://localhost:5000/api/actor/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/dashboard/movie/${id_movie}/actor/`);
    } catch (error) {
      console.error("There was an error saving the actor:", error);
      setError("There was an error saving the actor. Please try again.");
    }
  };

  const closeForm = () => {
    navigate(`/dashboard/movie/${id_movie}/actor/`); // Navigate to the actors list when close icon is clicked
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card col-lg-6 mx-auto">
        <div className="card-body">
          <div className="d-flex justify-content-end">
            <button className="btn-close" onClick={closeForm}></button>
          </div>
          <form onSubmit={saveActor}>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label className="form-label">Name Actor</label>
              <input
                type="text"
                className="form-control"
                value={nameActor}
                onChange={(e) => setNameActor(e.target.value)}
                placeholder="Name"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Picture</label>
              <input
                type="file"
                className="form-control"
                onChange={handlePictureChange}
                accept="image/*"
                required
              />
              {picturePreview && (
                <div className="mt-3">
                  <img
                    src={picturePreview}
                    alt="Preview"
                    className="img-thumbnail"
                    style={{ maxWidth: "200px" }}
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Cast</label>
              <input
                type="text"
                className="form-control"
                value={cast}
                onChange={(e) => setCast(e.target.value)}
                placeholder="Cast"
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
  );
};

export default AddActor;
