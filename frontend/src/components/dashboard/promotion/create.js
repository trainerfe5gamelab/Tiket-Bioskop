import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useIsAdmin from "../../../services/isAdmin";

const AddPicture = () => {
  useIsAdmin();
  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState(null);
  const [picturePreview, setPicturePreview] = useState(null); // State for picture preview
  const [fill, setFill] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(file);
      setPicturePreview(URL.createObjectURL(file)); // Generate and set preview URL
    } else {
      setPicture(null);
      setPicturePreview(null); // Reset preview if no file is selected
    }
  };

  const savePicture = async (e) => {
    e.preventDefault();
    if (!title || !picture || !fill) {
      setError("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("picture", picture);
    formData.append("fill", fill);

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/promotion/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/dashboard/promotion`);
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
    navigate(`/dashboard/promotion`);
  };

  return (
    <div className="container mt-5">
      <div className="card col-lg-8 mx-auto">
        <div className="card-body">
          <div className="d-flex justify-content-end">
            <button className="btn-close" onClick={closeForm}></button>
          </div>
          <form onSubmit={savePicture}>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="form-group">
              <label htmlFor="title">Name Picture</label>
              <input
                type="text"
                className="form-control mb-3"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                onChange={handlePictureChange}
                required
              />
              {picturePreview && (
                <div className="mt-3">
                  <img
                    src={picturePreview}
                    alt="Preview"
                    style={{ maxHeight: "200px", width: "auto" }}
                  />
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="fill">Fill</label>
              <textarea
                id="fill"
                className="form-control"
                value={fill}
                onChange={(e) => setFill(e.target.value)}
                placeholder="Fill information here..."
                rows={6}
                required></textarea>
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
