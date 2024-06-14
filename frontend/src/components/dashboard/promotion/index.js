import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { imageBest } from "../../../utils/utils";
import useIsAdmin from "../../../services/isAdmin";

const PromoList = () => {
  useIsAdmin();
  const [Promos, setPromos] = useState([]);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getPromos();
  }, []);

  const getPromos = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/promotion`);
      setPromos(response.data.promotions);

      setMovies(response.data.promotions);
    } catch (error) {
      console.error("There was an error fetching the Promos:", error);
    }
  };

  const deletePromo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/Promos/${id}`);
      getPromos();
      if (window.confirm("Are you sure you want to delete this time?")) {
        const token = localStorage.getItem("token");
        await axios.post(
          `http://localhost:5000/api/promotion/delete/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        getPromos();
      }
    } catch (error) {
      console.error("There was an error deleting the Promo:", error);
    }
  };

  const filteredPromos = Promos.filter(
    (Promo) =>
      Promo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Promo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2>Promo</h2>
      <div className="d-flex justify-content-end mb-3">
        <button
          onClick={() => navigate(`/dashboard/promotion/create`)}
          className="btn btn-success">
          Add New
        </button>
      </div>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search Promos"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Name Promo</th>
              <th>Promo</th>
              <th>Descrition</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPromos.map((Promo, index) => (
              <tr key={Promo.id_Promo}>
                <td>{index + 1}</td>
                <td>{Promo.title}</td>
                <td>
                  <img
                    src={imageBest(Promo.picture)}
                    alt={Promo.name_Promo}
                    style={{ width: "200px" }}
                  />
                </td>
                <td>{Promo.fill}</td>
                <td>
                  <button
                    onClick={() =>
                      navigate(`/dashboard/promotion/edit/${Promo.id_promo}`)
                    }
                    className="btn btn-info btn-sm mr-2">
                    <i class="bi bi-pen"></i>
                  </button>
                  <button
                    onClick={() => deletePromo(Promo.id_promo)}
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

export default PromoList;
