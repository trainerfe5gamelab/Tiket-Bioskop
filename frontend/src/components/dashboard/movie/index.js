import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { imageBest, formatDate } from "../../../utils/utils";
import useIsAdmin from "../../../services/isAdmin";

const Index = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useIsAdmin();

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/movie");
      setMovies(response.data.movies);
    } catch (error) {
      console.error("There was an error fetching the movies:", error);
    }
  };

  const deleteMovies = async (id) => {
    if (window.confirm("Are you sure you want to delete this Movie?")) {
      try {
        await axios.post(`http://localhost:5000/api/movie/delete/${id}`);
        getMovies();
      } catch (error) {
        console.error("There was an error deleting the movie:", error);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.name_film.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5" style={{ marginBottom: "200px" }}>
      <div className="row justify-content-center">
        <div className="">
          <div className="d-flex justify-content-between mb-3">
            <button
              onClick={() => navigate("/dashboard/movie/create")}
              className="btn btn-success">
              Add New
            </button>
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Picture</th>
                  <th>Duration</th>
                  <th>Director</th>
                  <th>Rate_Age</th>
                  <th>cast</th>
                  <th>Broadcast_Date</th>
                  <th>End_of_Show</th>
                  <th>Genre</th>
                  <th>Lainya</th>
                  <th>Jadwal</th>
                  <th>Picture</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMovies.map((movie, index) => (
                  <tr key={movie.id}>
                    <td>{index + 1}</td>
                    <td>{movie.name_film}</td>
                    <td>
                      <img
                        src={imageBest(movie.picture)}
                        alt={movie.name_film}
                        className="img-fluid"
                        style={{ maxWidth: "100px" }}
                      />
                    </td>

                    <td>{movie.durasi}</td>
                    <td>{movie.sutradara}</td>
                    <td>{movie.rate_age}</td>
                    <td>
                      <a href={`/dashboard/movie/${movie.id_movie}/actor`}>
                        Cast
                      </a>
                    </td>
                    <td>{formatDate(movie.broadcast_date)}</td>
                    <td>{formatDate(movie.end_of_show)}</td>
                    <td>{movie.name_genre}</td>
                    <td>
                      <a href={`/dashboard/movie/${movie.id_movie}/times`}>
                        Lainya
                      </a>
                    </td>
                    <td>
                      <a href={`/dashboard/movie/${movie.id_movie}/times`}>
                        Jadwal
                      </a>
                    </td>
                    <td>
                      <a href={`/dashboard/movie/${movie.id_movie}/picture`}>
                        picture
                      </a>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <button
                          onClick={() =>
                            navigate(`/dashboard/movie/edit/${movie.id_movie}`)
                          }
                          className="btn btn-info btn-sm me-2">
                          <i class="bi bi-pen"></i>
                        </button>
                        <button
                          onClick={() => deleteMovies(movie.id_movie)}
                          className="btn btn-danger btn-sm">
                          <i class="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
