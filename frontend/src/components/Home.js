import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import home1 from "../image/home/home1.jpg";
import home2 from "../image/home/home2.jpeg";
import home3 from "../image/home/home3.jpg";
import "./Home.css";

const Home = () => {
  const handleExploreClick = () => {
    const promotionSection = document.getElementById("movies");
    if (promotionSection) {
      promotionSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home">
      <Carousel>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100 img-fluid"
            src={home1}
            alt="First slide"
          />
          <Carousel.Caption>
            <div
              className="homemovie"
              style={{
                textAlign: "center",
                zIndex: "2",
                position: "absolute",
                left: "50%",
                paddingBottom: "70%",
              }}>
              <h1>DP MALL XXI Semarang</h1>
              <h3>Tickets For Movies</h3>
              <p>Membeli Tiket Dengan Mudah dan Aman.</p>
              <Button variant="primary" onClick={handleExploreClick}>
                Explore Now
              </Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100 img-fluid"
            src={home2}
            alt="Second slide"
          />
          <Carousel.Caption>
            <div
              className="homemovie"
              style={{
                textAlign: "center",
                zIndex: "2",
                position: "absolute",
                left: "50%",
                paddingBottom: "70%",
              }}>
              <h1>DP MALL XXI Semarang</h1>
              <h3>Tickets For Movies</h3>
              <p>Membeli Tiket Dengan Mudah dan Aman.</p>
              <Button variant="primary" onClick={handleExploreClick}>
                Explore Now
              </Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100 img-fluid"
            src={home3}
            alt="Third slide"
          />
          <Carousel.Caption>
            <div
              className="homemovie"
              style={{
                textAlign: "center",
                zIndex: "2",
                position: "absolute",
                left: "50%",
                paddingBottom: "70%",
              }}>
              <h1>DP MALL XXI Semarang</h1>
              <h3>Tickets For Movies</h3>
              <p>Membeli Tiket Dengan Mudah dan Aman.</p>
              <Button variant="primary" onClick={handleExploreClick}>
                Explore Now
              </Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

export default Home;
