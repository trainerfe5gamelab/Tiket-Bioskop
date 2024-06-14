import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";

const Header = () => {
  const navigate = useNavigate();
  const Logout_user = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#">MyApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle
                as={Nav.Link}
                className="text-white"
                id="dropdown-basic">
                Username
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
                <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={Logout_user}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
