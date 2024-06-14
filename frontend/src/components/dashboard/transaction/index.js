import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap 5 CSS is imported
import { formatDate, formatTime } from "../../../utils/utils";

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentView, setCurrentView] = useState("PROSES");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/transaction/all"
      );
      setTransactions(response.data.transactions.transaction);
    } catch (error) {
      console.error("There was an error fetching the transactions:", error);
    }
  };

  const filteredTransactions = transactions
    .filter((transaction) => transaction.status === currentView)
    .filter((transaction) => {
      const searchFields = [
        transaction.name_film,
        transaction.username,
        transaction.no_telp,
        transaction.total.toString(),
        transaction.seat,
      ];
      return searchFields.some((field) =>
        field.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

  // Counting the number of transactions for each status
  const countTransactions = (status) => {
    return transactions.filter((transaction) => transaction.status === status)
      .length;
  };

  const totalTransactions = transactions.length;
  const totalProsesTransactions = countTransactions("PROSES");
  const totalSuccessTransactions = countTransactions("SUCCES");

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <h2>Transactions List</h2>
        <button
          onClick={() => navigate("/addtransactions")}
          className="btn btn-success">
          Add New
        </button>
      </div>
      <div className="d-flex mb-3">
        <button
          onClick={() => setCurrentView("PROSES")}
          className={`btn me-2 ${
            currentView === "PROSES" ? "btn-primary" : "btn-outline-primary"
          }`}>
          Proses
        </button>
        <button
          onClick={() => setCurrentView("SUCCES")}
          className={`btn ${
            currentView === "SUCCES" ? "btn-primary" : "btn-outline-primary"
          }`}>
          Success
        </button>
        <input
          type="text"
          className="form-control ms-3"
          placeholder="Search transactions"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Transaction Summary</h5>
          <p className="card-text">Total Transactions: {totalTransactions}</p>
          <p className="card-text">
            Transactions in Process: {totalProsesTransactions}
          </p>
          <p className="card-text">
            Successful Transactions: {totalSuccessTransactions}
          </p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>No</th>
              <th>ID Ticket</th>
              <th>Date</th>
              <th>Hour</th>
              <th>Movie</th>
              <th>UserName</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Total</th>
              <th>Seat</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={transaction.id}>
                <td>{index + 1}</td>
                <td>{transaction.id_transaction}</td>
                <td>{formatDate(transaction.dated)}</td>
                <td>{formatTime(transaction.hour)}</td>
                <td>{transaction.name_film}</td>
                <td>{transaction.username}</td>
                <td>{transaction.no_telp}</td>
                <td>{transaction.email}</td>
                <td>{transaction.total}</td>
                <td>{transaction.seat}</td>
                <td>{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsList;
