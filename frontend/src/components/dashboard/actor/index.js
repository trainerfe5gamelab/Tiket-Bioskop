import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { imageBest } from "../../../utils/utils";
import useIsAdmin from "../../../services/isAdmin";

const ActorList = () => {
  useIsAdmin();
  const [actors, setActors] = useState([]);
  const [movie, setMovie] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { id_movie } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getActors();
  }, []);

  const getActors = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/movie/${id_movie}`
      );
      setActors(response.data.movies.actor); // Ensure response.data.actors is an array
      setMovie(response.data.movies.movie);
    } catch (error) {
      console.error("There was an error fetching the actors:", error);
    }
  };

  const deleteActor = async (id) => {
    if (window.confirm("Are you sure you want to delete this actor?")) {
      try {
        const token = localStorage.getItem("token"); // Adjust token fetching as needed
        await axios.post(
          `http://localhost:5000/api/actor/delete/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        getActors();
      } catch (error) {
        console.error("There was an error deleting the actor:", error);
      }
    }
  };

  const filteredActors = actors.filter(
    (actor) =>
      actor.name_actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      actor.cast.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="actor" className="columns mt-3 is-centered">
      <h2>Data Cast: {movie.name_film}</h2>
      <div className="column is-half">
        <button
          onClick={() => navigate(`/dashboard/movie/${id_movie}/actor/create`)}
          className="btn btn-primary mb-3">
          Add New
        </button>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search actors"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="table-responsive">
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>Movie</th>
                <th>Name Actor</th>
                <th>Picture</th>
                <th>Cast</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredActors.map((actor, index) => (
                <tr key={actor.id_actor}>
                  <td>{index + 1}</td>
                  <td>{movie.name_film}</td>
                  <td>{actor.name_actor}</td>
                  <td>
                    <img
                      src={imageBest(actor.picture)}
                      alt={actor.name_actor}
                      style={{ maxWidth: "100px" }}
                    />
                  </td>
                  <td>{actor.cast}</td>
                  <td>
                    <button
                      onClick={() =>
                        navigate(
                          `/dashboard/movie/${id_movie}/actor/edit/${actor.id_actor}`
                        )
                      }
                      className="btn btn-success btn-sm mr-2">
                      <i class="bi bi-pen"></i>
                    </button>
                    <button
                      onClick={() => deleteActor(actor.id_actor)}
                      className="btn btn-danger ms-2 btn-sm">
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

export default ActorList;
