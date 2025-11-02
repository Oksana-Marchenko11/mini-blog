import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext.jsx";

import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "./Header.css";
import { jwtDecode } from "jwt-decode";

export const Header = () => {
  const [username, setUsername] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const checkLogin = () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      setUsername(decoded.username || "");
    } catch {
      setUsername("");
    }
  };
  useEffect(() => {
    checkLogin();
  }, [isLoggedIn]);

  const logout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MiniBlog
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/create-post">
                  New Post
                </Nav.Link>
                <Nav.Link as={Link} to="/my-posts">
                  My Posts
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>

          {isLoggedIn ? (
            <>
              <span className="me-3 text-light">👋 Hi, {username}</span>
              <Button variant="outline-light" onClick={logout}>
                Logout
              </Button>
            </>
          ) : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
