import React, { useState, useEffect } from "react";
import { fetchTransactions } from "../services/api";
import "./Tiket.css";
import axios from "axios";
import { formatDate, formatTime } from "../utils/utils"; // Import function from utils.js
import { getUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

// Load Midtrans Snap script dynamically
const loadSnapScript = (src, onLoad) => {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  script.onload = onLoad;
  document.body.appendChild(script);
};

function Tiket() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(getUser(token));
    } else {
      navigate("/"); // Redirect to home if no token
    }
  }, [navigate]);

  useEffect(() => {
    const getTransactions = async () => {
      if (user) {
        try {
          const transactionsData = await fetchTransactions(user.userid);
          console.log("Fetched transactions:", transactionsData); // Debug log
          setTransactions(transactionsData);
        } catch (error) {
          console.error("Failed to fetch transactions:", error);
        }
      }
    };

    getTransactions();

    // Load Snap script on component mount
    loadSnapScript("https://app.sandbox.midtrans.com/snap/snap.js", () => {
      window.snap.pay = window.snap.pay.bind(window.snap);
    });
  }, [user]);

  const updateTransactionStatus = async (order_id) => {
    try {
      await axios.put("http://localhost:5000/api/transaction/update", {
        order_id: order_id,
        status: "SUCCES", // Corrected status spelling
      });
      console.log("Order status updated to SUCCESS");
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const handleMidtransPayment = (token, order_id) => {
    window.snap.pay(token, {
      onSuccess: (result) => {
        console.log(order_id);
        console.log("Payment success:", result);
        updateTransactionStatus(order_id); // Call updateTransactionStatus on success
      },
      onPending: (result) => {
        console.log("Payment pending:", result);
      },
      onError: (result) => {
        console.log("Payment error:", result);
      },
      onClose: () => {
        console.log("Payment popup closed");
      },
    });
  };

  return (
    <div className="tiketcontainer">
      {/* Purchase History Card */}
      <div className="history-card">
        <div className="card-body">
          <h3>Tiket</h3>
          <hr></hr>
          {transactions.length > 0 ? (
            transactions.map((trans) => (
              <div className="history-item">
                <table style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>Tanggal Order</th>
                      <th>Id Transaction</th>
                      <th>Judul Film</th>
                      <th>Kursi</th>
                      <th>Tanggal Tonton</th>
                      <th>Jam Tonton</th>
                      <th>Total Harga</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{formatDate(trans.created_at)}</td>
                      <td>{trans.id_transaction}</td>
                      <td>{trans.name_film}</td>
                      <td>{trans.seat}</td>
                      <td>{formatDate(trans.dated)}</td>
                      <td>{formatTime(trans.hour)}</td>
                      <td>{trans.total}</td>
                      <td
                        className={`fw-bold ${
                          trans.status === "PROSES"
                            ? "text-danger"
                            : trans.status === "SUCCES"
                            ? "text-success"
                            : ""
                        }`}>
                        {trans.status}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {trans.status === "PROSES" && (
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() =>
                      handleMidtransPayment(trans.token, trans.id_transaction)
                    }>
                    Pay Now
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No purchase history available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tiket;
