import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import "./NavbarIn.css";
import { getUser } from "../services/auth";

const NavbarIn = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("/"); // Default ke "/"
  const [user, setUser] = useState(null); // Initialize with null for better handling
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Set activeItem berdasarkan path URL saat ini
    setActiveItem(location.pathname);
  }, [location]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(getUser(token));
    }
  }, []); // Empty dependency array to run only once on mount

  const handleNavItemClick = (item) => {
    setActiveItem(item);
    navigate(item);
  };

  const handleSignInClick = () => {
    navigate("/sign"); // Navigate to the login page
  };

  return (
    <div>
      <Navbar
        expand="lg"
        className={`navbar-custom fixed-top ${
          isScrolled ? "navbar-scrolled" : "bg-transparent"
        } mt-0`}
        style={{ paddingTop: "5px" }}>
        <Container>
          <Navbar.Brand href="/" className="brand-custom">
            <span className="cine">Cine</span>
            <span className="plex">plex+</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end">
            <Nav className="mx-auto">
              <Nav.Link
                href="/"
                className={`nav-link-custom ${
                  activeItem === "/" ? "active" : ""
                }`}
                onClick={() => handleNavItemClick("/")}
                style={{ color: "white" }}>
                Home
              </Nav.Link>

              <Nav.Link
                href="/#movies"
                className={`nav-link-custom ${
                  activeItem === "movies" ? "active" : ""
                }`}
                onClick={() => handleNavItemClick("/#movies")}
                style={{ color: "white" }}>
                Movies
              </Nav.Link>

              <Nav.Link
                href="/#promotion"
                className={`nav-link-custom ${
                  activeItem === "promotion" ? "active" : ""
                }`}
                onClick={() => handleNavItemClick("/#promotion")}
                style={{ color: "white" }}>
                Promotion
              </Nav.Link>

              <Nav.Link
                href="/#contact"
                className={`nav-link-custom ${
                  activeItem === "contact" ? "active" : ""
                }`}
                onClick={() => handleNavItemClick("/#contact")}
                style={{ color: "white" }}>
                Contact
              </Nav.Link>

              {user && (
                <Nav.Link
                  href="/tiket"
                  className={`nav-link-custom ${
                    activeItem === "/tiket" ? "active" : ""
                  }`}
                  onClick={() => handleNavItemClick("/tiket")}
                  style={{ color: "white" }}>
                  <i className="bi bi-ticket-perforated p-1"></i> Tiket
                </Nav.Link>
              )}
            </Nav>
            <Nav className="align-items-center">
              {user ? (
                <Nav.Link
                  className={`nav-link-custom ${
                    activeItem === "/MyProfil" ? "active" : ""
                  }`}
                  onClick={() => handleNavItemClick("/MyProfil")}
                  style={{ color: "white" }}>
                  <i className="bi bi-person"></i>
                </Nav.Link>
              ) : (
                <Button
                  variant="outline-light"
                  onClick={handleSignInClick}
                  className="sign-in-button">
                  Sign In
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarIn;
