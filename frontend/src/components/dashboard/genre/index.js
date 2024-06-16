import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useIsAdmin from "../../../services/isAdmin";

const GenreList = () => {
  useIsAdmin();
  const [Genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getGenres();
  }, []);

  const getGenres = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/genre`);
      setGenres(response.data.genres);

      setMovies(response.data.genres);
    } catch (error) {
      console.error("There was an error fetching the Genres:", error);
    }
  };

  const deleteGenre = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this time?")) {
        const token = localStorage.getItem("token");
        await axios.post(
          `http://localhost:5000/api/genre/delete/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        getGenres();
      }
    } catch (error) {
      console.error("There was an error deleting the Genre:", error);
    }
  };

  const filteredGenres = Genres.filter(
    (Genre) =>
      Genre.name_genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Genre.name_genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2>Genre</h2>
      <div className="d-flex justify-content-end mb-3">
        <button
          onClick={() => navigate(`/dashboard/genre/create`)}
          className="btn btn-success">
          Add New
        </button>
      </div>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search Genres"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Name Genre</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGenres.map((Genre, index) => (
              <tr key={Genre.id_genre}>
                <td>{index + 1}</td>
                <td>{Genre.name_genre}</td>

                <td>
                  <button
                    onClick={() =>
                      navigate(`/dashboard/genre/edit/${Genre.id_genre}`)
                    }
                    className="btn btn-info btn-sm mr-2">
                    <i class="bi bi-pen"></i>
                  </button>
                  <button
                    onClick={() => deleteGenre(Genre.id_genre)}
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

export default GenreList;
