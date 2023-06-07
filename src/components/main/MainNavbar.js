import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import AuthService from "../../services/AuthService";

function MainNavbar(props) {
  const handleLogOut = () => {
    AuthService.logout();
    props.setAppUser(null);
  };
  return (
    <Navbar bg="dark" variant="dark" expand="md" sticky="top">
      <Container>
        <Nav>
          <Navbar.Brand as={Link} to={"/"}>
            JobSearch
          </Navbar.Brand>
        </Nav>
        <Navbar.Toggle aria-controls="navbar-form" />
        <Navbar.Collapse id="navbar-form">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/vacancies"}>
              Для кандидатів
            </Nav.Link>
            <Nav.Link as={Link} to={"/resumes"}>
              Для роботодавців
            </Nav.Link>
          </Nav>
          {props.currentUser ? (
            <Nav>
              <Nav.Link
                as={Link}
                to={`/account/${props.currentUser.user.role.roleName.toLowerCase()}`}
              >
                Мій профіль {`(${props.currentUser.user.fullName})`}
              </Nav.Link>
              <Nav.Link as={Link} to={"/"} onClick={handleLogOut}>
                Вийти <FiLogOut />
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Button
                variant="primary"
                as={Link}
                to={"/registration"}
                className="m-1"
              >
                Реєстрація
              </Button>
              <Button variant="primary" as={Link} to={"/login"} className="m-1">
                Вхід
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
