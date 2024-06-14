import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useIsAdmin from "../../../services/isAdmin";

const EditPicture = () => {
  useIsAdmin();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState(null);
  const [picturePreview, setPicturePreview] = useState(null);
  const [fill, setFill] = useState("");
  const [previousPicture, setPreviousPicture] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPictureDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/promotion/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { title, fill, picture } = response.data.promotion[0];
        setTitle(title);
        setFill(fill);
        setPreviousPicture(picture); // Assuming 'picture' contains the URL of the existing image
        setPicturePreview(`http://localhost:5000/uploads/${picture}`); // Set the URL for preview
      } catch (error) {
        console.error("Error fetching picture details:", error);
        setError("Error fetching picture details. Please try again.");
      }
    };

    fetchPictureDetails();
  }, [id]);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(file);
      setPicturePreview(URL.createObjectURL(file)); // Generate and set preview URL
    } else {
      setPicture(null);
      setPicturePreview(`http://localhost:5000/uploads/${previousPicture}`); // Reset to previous picture preview
    }
  };

  const savePicture = async (e) => {
    e.preventDefault();
    if (!title || !fill) {
      setError("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    if (picture) {
      formData.append("picture", picture);
    }
    formData.append("fill", fill);
    formData.append("picture_lama", previousPicture); // Send the previous picture

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/promotion/edit/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
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

            <div className="form-group mt-3">
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

export default EditPicture;
