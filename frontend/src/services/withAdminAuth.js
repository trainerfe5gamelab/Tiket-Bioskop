import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "./auth";

const useAdminAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = getUser(token);
      if (decoded.role === "admin") {
        setUser(decoded);
      } else {
        navigate("/"); // Redirect ke home jika bukan admin
      }
    } else {
      navigate("/"); // Redirect ke home jika tidak ada token
    }
  }, [navigate]);

  return user;
};

export default useAdminAuth;
