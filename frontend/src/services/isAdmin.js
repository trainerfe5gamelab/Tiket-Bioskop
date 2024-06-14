import { useNavigate } from "react-router-dom";
import { getUserAdmin } from "./auth";
import { useEffect } from "react";

const useIsAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userToken = getUserAdmin(token);
      if (userToken.role !== "admin") {
        navigate("/"); // Redirect to home if not admin
      }
    } else {
      navigate("/"); // Redirect to home if no token
    }
  }, [navigate]);
};

export default useIsAdmin;
