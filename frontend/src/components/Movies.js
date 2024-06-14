import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchMovies } from "../services/api"; // Import function from api.js
import { imageBest } from "../utils/utils"; // Import function from utils.js
import "./Movies.css";

const MoviesSection = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const moviesData = await fetchMovies();
      setMovies(moviesData);
    };

    getMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div id="movies">
      <h1 className="fw-bold text-center text-movie">
        MOVIES | DP MALL XXI Semarang
      </h1>
      <div className="row">
        <Slider {...settings}>
          {movies.map((movie) => (
            <a
              href={"/movie/" + movie.id_movie}
              key={movie.id_movie}
              className="text-decoration-none">
              <div className="col">
                <div className="card m-2 text-center card-movie">
                  <img
                    src={imageBest(movie.picture)}
                    alt={movie.name_film}
                    className="img-movie"
                  />
                  <div
                    className="card-footer name-movie"
                    style={{ backgroundColor: "#ffe500" }}>
                    <h5 className="fw-bold text-truncate">{movie.name_film}</h5>
                  </div>
                  <div
                    className="card-footer buy-now"
                    style={{ backgroundColor: "#253740", color: "#fff" }}>
                    <h4 className="fw-bold">BUY NOW</h4>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MoviesSection;
