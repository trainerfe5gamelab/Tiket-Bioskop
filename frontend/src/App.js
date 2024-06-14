import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PurchaseProvider } from "./components/PurchaseContext";
import Cine from "./Pages/Cine";
import SeatBuy from "./Pages/SeatBuy";
import Schedule from "./Pages/Schedule";
import MadSchedule from "./Pages/MadSchedule";
import CivilSchedule from "./Pages/CivilSchedule";
import CashSchedule from "./Pages/CashSchedule";
import MyProfil from "./Pages/MyProfil";
import Signin from "./Pages/Signin";
import Tiket from "./Pages/Tiket";
import Register from "./components/Signup";
import Dashboard from "./Pages/dashboard";
import DashboardMovie from "./Pages/dashboardMovie";
import DashboardMovieCreate from "./Pages/dashboardMovieCreate";
import DashboardMovieEdit from "./Pages/dashboardMovieEdit";
import DashboardTimes from "./Pages/dashboardTimes";
import DashboardTimesCreate from "./Pages/dashboardTimesCreate";
import DashboardTimesEdit from "./Pages/dashboardTimesEdit";
import DashboardActor from "./Pages/dashboardActor";
import DashboardActorCreate from "./Pages/dashboardActorCreate";
import DashboardActorEdit from "./Pages/dashboardActorEdit";
import DashboardPicture from "./Pages/dashboardPicture";
import DashboardPictureCreate from "./Pages/dashboardPictureCreate";
import DashboardPictureEdit from "./Pages/dashboardPictureEdit";
import DashboardTransaction from "./Pages/dashboardTransaction";
import DashboardPromotion from "./Pages/dashboardPromotion";
import DashboardPromotionCreate from "./Pages/dashboardPromotionCreate";
import DashboardPromotionEdit from "./Pages/dashboardPromotionEdit";
import "bootstrap/dist/css/bootstrap.min.css";
import { getUser } from "./services/auth";

const checkTokenExpiration = (token) => {
  const decoded = getUser(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};
const App = () => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      const token = localStorage.getItem("token");
      if (token && checkTokenExpiration(token)) {
        localStorage.removeItem("token");
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        const token = localStorage.getItem("token");
        if (token && checkTokenExpiration(token)) {
          localStorage.removeItem("token");
          window.location.href = "/"; // Redirect to login if token is expired
        }
      }
    };

    const checkAndRemoveExpiredToken = () => {
      const token = localStorage.getItem("token");
      if (token && checkTokenExpiration(token)) {
        localStorage.removeItem("token");
        window.location.href = "/"; // Redirect to login if token is expired
      }
    };

    // Check token on load
    checkAndRemoveExpiredToken();

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <PurchaseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Cine />} />
          <Route path="/SeatBuy/:id" element={<SeatBuy />} />
          <Route path="/movie/:id" element={<Schedule />} />
          <Route path="/MadSchedule" element={<MadSchedule />} />
          <Route path="/CivilSchedule" element={<CivilSchedule />} />
          <Route path="/CashSchedule" element={<CashSchedule />} />
          <Route path="/MyProfil" element={<MyProfil />} />
          <Route path="/sign" element={<Signin />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/tiket" element={<Tiket />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/movie" element={<DashboardMovie />} />
          <Route
            path="/dashboard/movie/create"
            element={<DashboardMovieCreate />}
          />
          <Route
            path="/dashboard/movie/edit/:id"
            element={<DashboardMovieEdit />}
          />
          <Route
            path="/dashboard/movie/:id_movie/times"
            element={<DashboardTimes />}
          />
          <Route
            path="/dashboard/movie/:id_movie/times/create"
            element={<DashboardTimesCreate />}
          />
          <Route
            path="/dashboard/movie/:id_movie/time/edit/:id"
            element={<DashboardTimesEdit />}
          />
          <Route
            path="/dashboard/movie/:id_movie/actor/"
            element={<DashboardActor />}
          />
          <Route
            path="/dashboard/movie/:id_movie/actor/create"
            element={<DashboardActorCreate />}
          />
          <Route
            path="/dashboard/movie/:id_movie/actor/edit/:id"
            element={<DashboardActorEdit />}
          />
          <Route
            path="/dashboard/movie/:id_movie/picture/"
            element={<DashboardPicture />}
          />
          <Route
            path="/dashboard/movie/:id_movie/picture/create"
            element={<DashboardPictureCreate />}
          />
          <Route
            path="/dashboard/movie/:id_movie/picture/edit/:id"
            element={<DashboardPictureEdit />}
          />

          <Route
            path="/dashboard/transaction"
            element={<DashboardTransaction />}
          />
          <Route path="/dashboard/promotion" element={<DashboardPromotion />} />
          <Route
            path="/dashboard/promotion/create"
            element={<DashboardPromotionCreate />}
          />
          <Route
            path="/dashboard/promotion/edit/:id"
            element={<DashboardPromotionEdit />}
          />
        </Routes>
      </Router>
    </PurchaseProvider>
  );
};

export default App;
