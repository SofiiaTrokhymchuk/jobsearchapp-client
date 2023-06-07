import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

function JobseekerRegistartion() {
  const navigate = useNavigate();
  const [jobseeker, setJobseeker] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    birthdate: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState();
  const [inputErrors, setInputErrors] = useState({
    fullName: null,
    email: null,
    phoneNumber: null,
    birthdate: null,
    password: null,
  });

  const handleJobseekerInputChange = (e) => {
    setJobseeker({
      ...jobseeker,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AuthService.registerJobseeker(jobseeker).then((res) => {
      if (res.status === 201) {
        navigate("/verify");
      } else {
        setErrMsg(res.data.message);
        let errors = res.data.validationErrors.errors.map((error) => {
          return { [error.path]: error.msg };
        });
        errors = Object.values(errors).reduce((result, currentError) => {
          return { ...result, ...currentError };
        }, {});
        setInputErrors(errors);
      }
    });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-2 mb-5 pb-5">
      <Form
        className="border border-secondary rounded p-4"
        onSubmit={handleSubmit}
        style={{ width: "25rem", backgroundColor: "white" }}
      >
        <h4>Зареєструватись як кандидат:</h4>
        <Form.Group className="mb-2" controlId="fullName">
          <Form.Label>Повне ім'я</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введіть повне ім'я"
            name="fullName"
            value={jobseeker.fullName}
            onChange={handleJobseekerInputChange}
            required={true}
            isInvalid={!!inputErrors.fullName}
          />
          <Form.Control.Feedback type="invalid">
            {inputErrors.fullName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Електронна пошта</Form.Label>
          <Form.Control
            type="email"
            placeholder="Введіть ел. пошту"
            name="email"
            value={jobseeker.email}
            onChange={handleJobseekerInputChange}
            required={true}
            isInvalid={!!inputErrors.email}
          />
          <Form.Control.Feedback type="invalid">
            {inputErrors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-2" controlId="phoneNumber">
          <Form.Label>Номер телефону</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Введіть номер телефону"
            name="phoneNumber"
            value={jobseeker.phoneNumber}
            onChange={handleJobseekerInputChange}
            required={true}
            isInvalid={!!inputErrors.phoneNumber}
          />
          <Form.Control.Feedback type="invalid">
            {inputErrors.phoneNumber}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="birthdate">
          <Form.Label>Дата народження:</Form.Label>
          <Form.Control
            type="date"
            placeholder="Введіть дату народження"
            name="birthdate"
            value={jobseeker.birthdate}
            onChange={handleJobseekerInputChange}
            required={true}
            isInvalid={!!inputErrors.birthdate}
          />
          <Form.Control.Feedback type="invalid">
            {inputErrors.birthdate}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введіть пароль"
            name="password"
            value={jobseeker.password}
            onChange={handleJobseekerInputChange}
            required={true}
            isInvalid={!!inputErrors.password}
          />
          <Form.Control.Feedback type="invalid">
            {inputErrors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Зареєструватись
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

export default JobseekerRegistartion;
