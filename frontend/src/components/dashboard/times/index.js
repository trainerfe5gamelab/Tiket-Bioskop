import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate, formatTime } from "../../../utils/utils";
import useIsAdmin from "../../../services/isAdmin";

const TimesList = () => {
  useIsAdmin();
  const [times, setTimes] = useState([]);
  const [movie, setMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { id_movie } = useParams();

  useEffect(() => {
    console.log("Fetching times...");
    getTimes();
  }, []);

  useEffect(() => {
    if (id_movie) {
      console.log(`Fetching movie with id_movie: ${id_movie}`);
      getMovie();
    }
  }, [id_movie]);

  const getTimes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/time");
      setTimes(response.data.times);
    } catch (error) {
      console.error("There was an error fetching the times:", error);
    }
  };

  const getMovie = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/movie/${id_movie}`
      );
      setMovie(response.data.movies);
    } catch (error) {
      console.error("There was an error fetching the movie:", error);
    }
  };

  const deleteTimes = async (id) => {
    if (window.confirm("Are you sure you want to delete this time?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.post(
          `http://localhost:5000/api/time/delete/${id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        getTimes();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const filteredTimes = times.filter(
    (time) =>
      movie &&
      time.id_movie === parseInt(id_movie) &&
      (movie.movie.name_film
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
        formatDate(time.dated).includes(searchQuery) ||
        formatTime(time.hour).includes(searchQuery))
  );

  return (
    <div id="times" className="columns mt-5 is-centered">
      <div className="column is-half">
        <button
          onClick={() => navigate(`/dashboard/movie/${id_movie}/times/create`)}
          className="btn btn-primary mb-3">
          Add New
        </button>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search times"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="table-responsive">
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>Name Film</th>
                <th>Dated</th>
                <th>Hour</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTimes.map((time, index) => (
                <tr key={time.id_time}>
                  <td>{index + 1}</td>
                  <td>{movie ? movie.movie.name_film : "Loading..."}</td>
                  <td>{formatDate(time.dated)}</td>
                  <td>{formatTime(time.hour)}</td>
                  <td>{time.price}</td>
                  <td>
                    <button
                      onClick={() =>
                        navigate(
                          `/dashboard/movie/${movie.movie.id_movie}/time/edit/${time.id_time}`
                        )
                      }
                      className="btn btn-sm btn-success">
                      <i class="bi bi-pen"></i>
                    </button>
                    <button
                      onClick={() => deleteTimes(time.id_time)}
                      className="btn btn-sm btn-danger ms-2">
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimesList;
