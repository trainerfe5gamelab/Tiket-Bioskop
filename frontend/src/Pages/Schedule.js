import React from "react";
import MovieSchedule from "../components/movie/MovieSchedule";
import "bootstrap/dist/css/bootstrap.min.css";
import NabvarIn from "../components/NavbarIn";

import Footer from "../components/Footer";

const Schedule = () => {
  return (
    <div>
      <NabvarIn />
      <MovieSchedule />
      <Footer />
    </div>
  );
};

export default Schedule;
