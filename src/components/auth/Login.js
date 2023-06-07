import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

function Login(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState();
  const navigate = useNavigate();

  const handleLoginInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      AuthService.login(user).then((res) => {
        if (res.status === 200) {
          props.setAppUser(AuthService.getCurrentUser());
          navigate("/");
        } else {
          setErrMsg(res.data);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-4 mb-5 pb-5">
      <Form
        className="border border-secondary rounded p-4"
        onSubmit={handleSubmit}
        style={{ width: "25rem", backgroundColor: "white" }}
      >
        <h4>Увійти в свій акаунт:</h4>

        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Електронна пошта</Form.Label>
          <Form.Control
            type="email"
            placeholder="Введіть ел. пошту"
            name="email"
            value={user.email}
            onChange={handleLoginInputChange}
            required={true}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введіть пароль"
            name="password"
            value={user.password}
            onChange={handleLoginInputChange}
            required={true}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Увійти
        </Button>
        {errMsg && (
          <Alert className="mt-3 w-100" variant="danger">
            {errMsg}
          </Alert>
        )}
      </Form>
    </Container>
  );
}

export default Login;
