import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { imageBest } from "../../../utils/utils";
import useIsAdmin from "../../../services/isAdmin";

const PictureList = () => {
  useIsAdmin();
  const [pictures, setPictures] = useState([]);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { id_movie } = useParams();

  useEffect(() => {
    getPictures();
  }, []);

  const getPictures = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/movie/${id_movie}`
      );
      setPictures(response.data.movies.pictures);
      setMovies(response.data.movies.movie);
    } catch (error) {
      console.error("There was an error fetching the pictures:", error);
    }
  };

  const deletePicture = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/pictures/${id}`);
      getPictures();
    } catch (error) {
      console.error("There was an error deleting the picture:", error);
    }
  };

  const filteredPictures = pictures.filter(
    (picture) =>
      picture.name_pictures.toLowerCase().includes(searchQuery.toLowerCase()) ||
      picture.name_pictures.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2>Picture : {movies.name_film}</h2>
      <div className="d-flex justify-content-end mb-3">
        <button
          onClick={() =>
            navigate(`/dashboard/movie/${id_movie}/picture/create`)
          }
          className="btn btn-success">
          Add New
        </button>
      </div>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search pictures"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Name Picture</th>
              <th>Picture</th>
              <th>Movie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPictures.map((picture, index) => (
              <tr key={picture.id_picture}>
                <td>{index + 1}</td>
                <td>{picture.name_pictures}</td>
                <td>
                  <img
                    src={imageBest(picture.picture)}
                    alt={picture.name_picture}
                    style={{ width: "200px" }}
                  />
                </td>
                <td>{movies.name_film}</td>
                <td>
                  <button
                    onClick={() =>
                      navigate(
                        `/dashboard/movie/${id_movie}/picture/edit/${picture.id_picture}`
                      )
                    }
                    className="btn btn-info btn-sm mr-2">
                    <i class="bi bi-pen"></i>
                  </button>
                  <button
                    onClick={() => deletePicture(picture.id_picture)}
                    className="btn btn-danger btn-sm ms-2">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PictureList;
