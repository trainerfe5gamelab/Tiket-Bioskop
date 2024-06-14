import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useIsAdmin from "../../../services/isAdmin";
import { imageBest } from "../../../utils/utils";

const EditActor = () => {
  useIsAdmin();
  const [name_actor, setNameActor] = useState("");
  const [picture, setPicture] = useState(null);
  const [picturePreview, setPicturePreview] = useState(null);
  const [picture_lama, setPictureLama] = useState(null);
  const [cast, setCast] = useState("");

  const navigate = useNavigate();
  const { id, id_movie } = useParams();

  useEffect(() => {
    if (id) {
      getActorById();
    }
  }, [id]);

  const updateActor = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name_actor", name_actor);
    formData.append("cast", cast);
    formData.append("picture_lama", picture_lama);
    if (picture) {
      formData.append("picture", picture);
    }

    try {
      const token = localStorage.getItem("token"); // Adjust token fetching as needed
      await axios.patch(
        `http://localhost:5000/api/actor/edit/${id_movie}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate(`/dashboard/movie/${id_movie}/actor`);
    } catch (error) {
      console.log(error);
    }
  };

  const getActorById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/actor/${id}`);
      const actor = response.data.actor[0];
      setNameActor(actor.name_actor);
      setPictureLama(actor.picture);
      setPicturePreview(imageBest(actor.picture)); // Set the old picture preview
      setCast(actor.cast);
    } catch (error) {
      console.error("Error fetching actor data:", error);
      alert("Failed to fetch actor data");
    }
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicturePreview(reader.result); // Set the new picture preview
      };
      reader.readAsDataURL(file);
    }
  };

  const closeForm = () => {
    navigate(`/dashboard/movie/${id_movie}/actor`);
  };

  return (
    <div className="container mt-5">
      <div className="card col-lg-6 mx-auto">
        <div className="card-body">
          <div className="d-flex justify-content-end">
            <button className="btn-close" onClick={closeForm}></button>
          </div>
          <form onSubmit={updateActor}>
            <div className="field">
              <label className="label">Name Actor</label>
              <div className="control">
                <input
                  type="text"
                  className="form-control mb-3"
                  value={name_actor}
                  onChange={(e) => setNameActor(e.target.value)}
                  placeholder="Name"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Picture</label>
              <div className="control">
                <input
                  type="file"
                  className="form-control mb-3"
                  onChange={handlePictureChange}
                  placeholder="Picture"
                />
              </div>
              {picturePreview && (
                <img
                  src={picturePreview}
                  alt="Picture Preview"
                  style={{ width: "200px", marginTop: "10px" }}
                />
              )}
            </div>
            <div className="field">
              <label className="label">Cast</label>
              <div className="control">
                <input
                  className="form-control mb-5"
                  value={cast}
                  onChange={(e) => setCast(e.target.value)}
                  placeholder="Cast"
                  required
                />
              </div>
            </div>
            <div className="field">
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

export default EditActor;
