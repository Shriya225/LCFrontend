import { useState } from 'react';
import { Navbar, Nav, Container, Button, Image } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import collegeLogo from "../assets/mic.png";

const NavBar = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      expand="lg"
      style={{ 
        backgroundColor: "#0b1e42",
        padding: "0.5rem 0"
      }}
      variant="dark"
      expanded={expanded}
      onToggle={setExpanded}
      className="shadow"
    >
      <Container>
        {/* Logo + College Name - Always visible on all screens */}
        <Navbar.Brand 
          as={NavLink} 
          to="/" 
          className="d-flex align-items-center"
          onClick={() => setExpanded(false)}
        >
          <Image
            src={collegeLogo}
            alt="College Logo"
            height="42"
            width="42"
            className="me-2"
            style={{ borderRadius: '6px', objectFit: 'contain' }}
          />
          <div className="d-flex flex-column">
            <span style={{ 
              fontSize: "0.75rem", 
              color: "#f5a623",
              lineHeight: "1.1"
            }}>
              DVR & Dr. HS
            </span>
            <span className="fw-bold" style={{ 
              fontSize: "0.95rem", 
              color: "white",
              lineHeight: "1.1"
            }}>
              MIC College of Technology
            </span>
            <span style={{ 
              fontSize: "0.65rem", 
              color: "#f5a623",
              lineHeight: "1.1"
            }}>
              Autonomous
            </span>
          </div>
        </Navbar.Brand>

        {/* Toggle for mobile */}
        <Navbar.Toggle aria-controls="nav-bar" />

        {/* Navigation Links */}
        <Navbar.Collapse id="nav-bar">
          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link
              as={NavLink}
              to="/"
              end
              className="mx-2"
              style={({ isActive }) => ({
                color: isActive ? "#f5a623" : "white",
                fontWeight: isActive ? "600" : "400",
                borderRadius: '4px',
                padding: '0.5rem 1rem'
              })}
              onClick={() => setExpanded(false)}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/dashboard"
              className="mx-2"
              style={({ isActive }) => ({
                color: isActive ? "#f5a623" : "white",
                fontWeight: isActive ? "600" : "400",
                borderRadius: '4px',
                padding: '0.5rem 1rem'
              })}
              onClick={() => setExpanded(false)}
            >
              Dashboard
            </Nav.Link>
            <Button
              variant="outline-light"
              className="ms-lg-3 mt-2 mt-lg-0 fw-semibold"
              style={{ 
                borderRadius: '6px',
                padding: '0.5rem 1.5rem',
                borderWidth: '2px'
              }}
              onClick={() => {
                navigate("/login");
                setExpanded(false);
              }}
            >
              Login
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;