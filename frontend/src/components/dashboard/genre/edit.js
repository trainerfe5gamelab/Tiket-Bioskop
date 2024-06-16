import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useIsAdmin from "../../../services/isAdmin";

const EditPicture = () => {
  useIsAdmin();
  const { id } = useParams();
  const [nameGenre, setNameGenre] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/genre/${id}`
        );
        const genreData = response.data.genres[0];

        setNameGenre(genreData.name_genre); // Set initial form input value
      } catch (error) {
        console.error("There was an error fetching the Genre:", error);
      }
    };

    if (id) {
      getGenres();
    }
  }, [id]);

  const savePicture = async (e) => {
    e.preventDefault();
    if (!nameGenre) {
      setError("Please fill in all fields.");
      return;
    }

    const formData = {
      name_genre: nameGenre,
    };
    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:5000/api/genre/edit/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/dashboard/genre`);
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
    navigate(`/dashboard/genre`);
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
              <label htmlFor="title">Name Genre</label>
              <input
                type="text"
                className="form-control mb-3"
                id="title"
                value={nameGenre}
                onChange={(e) => setNameGenre(e.target.value)}
                placeholder="Name Genre"
                required
              />
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
