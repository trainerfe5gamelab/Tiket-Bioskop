import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useIsAdmin from "../../../services/isAdmin";

const EditPicture = () => {
  useIsAdmin();
  const [namePicture, setNamePicture] = useState("");
  const [picture, setPicture] = useState(null);
  const [picture_lama, setPictureLama] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id, id_movie } = useParams();

  useEffect(() => {
    getPictureById();
  }, [id]);

  const getPictureById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/picture/${id}`
      );
      const pictureData = response.data.picture[0];
      setNamePicture(pictureData.name_pictures);
      setPictureLama(pictureData.picture);
      setPicture(null); // Reset file input for user to upload a new file if needed
    } catch (error) {
      console.error("There was an error fetching the picture data:", error);
      setError("Failed to fetch picture data. Please try again.");
    }
  };

  const updatePicture = async (e) => {
    e.preventDefault();
    if (!id_movie || !namePicture || (!picture && !picture_lama)) {
      setError("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("id_movie", id_movie);
    formData.append("name_pictures", namePicture);
    formData.append("picture", picture);
    formData.append("picture_lama", picture_lama);

    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/picture/edit/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate(`/dashboard/movie/${id_movie}/picture`);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors.join(" "));
      } else {
        console.error("There was an error updating the picture:", error);
        setError("There was an error updating the picture. Please try again.");
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
          <form onSubmit={updatePicture}>
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
              />
              <small>
                Leave blank if you do not want to change the picture.
              </small>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-success">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPicture;
