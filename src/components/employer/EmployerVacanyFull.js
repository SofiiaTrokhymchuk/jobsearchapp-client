import axios from "../../axios.js";
import React, { useEffect, useState } from "react";
import { Card, Button, Container, Alert, Modal, Form } from "react-bootstrap";
import { BsCalendarCheck } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { useParams, useNavigate } from "react-router-dom";
import UserVacancyService from "../../services/UserVacancyService.js";
import LocationService from "../../services/LocationService.js";
import CategoryService from "../../services/CategoryService.js";

function EmployerVacanyFull() {
  const [vacancy, setVacany] = useState({
    position: "",
    category: "",
    categoryName: "",
    jobLocation: "",
    jobLocationName: "",
    salary: "",
    experience: "",
    description: "",
    createdAt: "",
    updatedAt: "",
  });
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [inputErrors, setInputErrors] = useState({
    position: null,
    salary: null,
    experience: null,
    description: null,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getVacancy();
    CategoryService.getCategories().then((res) => {
      if (res.status === 200) {
        setCategories(res.data);
      }
    });
    LocationService.getLocations().then((res) => {
      if (res.status === 200) {
        setLocations(res.data);
      }
    });
  }, []);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    getVacancy();
    setErrMsg(null);
    setInputErrors({
      position: null,
      salary: null,
      experience: null,
      description: null,
    });
  };

  const handleVacancyInputChange = (e) => {
    setVacany({
      ...vacancy,
      [e.target.name]: e.target.value,
    });
  };

  const getVacancy = () => {
    UserVacancyService.getOneVacancy(id).then((res) => {
      const {
        category,
        jobLocation,
        position,
        description,
        salary,
        experience,
        createdAt,
        updatedAt,
      } = res.data;
      setVacany({
        position,
        salary,
        createdAt,
        updatedAt,
        description,
        experience,
        category: category._id,
        categoryName: category.categoryName,
        jobLocation: jobLocation._id,
        jobLocationName: jobLocation.locationName,
      });
    });
  };

  const handleUpdateVacancy = (e) => {
    e.preventDefault();
    UserVacancyService.updateVacancy(id, vacancy).then((res) => {
      if (res.status === 200) {
        setErrMsg(null);
        setInputErrors({
          position: null,
          skills: null,
          salary: null,
          experience: null,
          description: null,
        });
        setVacany(res.data);
        window.location.reload(true);
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

  const handleDeleteVacancy = () => {
    UserVacancyService.deleteVacancy(id).then(() => {
      navigate("/account/employer");
    });
  };

  return (
    <>
      <div className="mb-5 pb-5">
        <Container className="pt-2 mb-5">
          <Card className="p-2">
            <Card.Title>
              {" "}
              {vacancy.position} <br /> {vacancy.salary} UAH
            </Card.Title>
            <Card.Text className="text-muted mb-2">
              <BsCalendarCheck /> Дата створення:{" "}
              {vacancy.createdAt.slice(0, 10)}
            </Card.Text>
            <Card.Text className="text-muted mb-2">
              <BsCalendarCheck /> Останній раз змінено:{" "}
              {vacancy.updatedAt.slice(0, 10)}
            </Card.Text>
            <Card.Text>
              <GoLocation /> Локація: {vacancy.jobLocationName}
            </Card.Text>
            <Card.Text>Категорія: {vacancy.categoryName}</Card.Text>
            <Card.Text>Досвід роботи: {vacancy.experience}</Card.Text>
            <Card.Text>{vacancy.description}</Card.Text>
            <div className="f-flex-row">
              <Button className="me-2" variant="secondary" onClick={handleShow}>
                Редагувати
              </Button>
              <Button variant="danger" onClick={handleDeleteVacancy}>
                Видалити
              </Button>
              {errMsg && (
                <Alert className="mt-3 w-100" variant="danger">
                  {errMsg}
                </Alert>
              )}
            </div>
          </Card>
        </Container>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Заповніть Ваше резюме</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateVacancy}>
            <Form.Group>
              <Form.Label>Оберіть категорію сфери роботи</Form.Label>
              <Form.Select
                name="category"
                value={vacancy.category}
                onChange={handleVacancyInputChange}
                required={true}
              >
                <option value="">Всі категорії</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Вакантна посада</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введіть назву посади"
                name="position"
                required={true}
                value={vacancy.position}
                onChange={handleVacancyInputChange}
                isInvalid={!!inputErrors.position}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {inputErrors.position}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Оберіть місце роботи</Form.Label>
              <Form.Select
                name="jobLocation"
                value={vacancy.jobLocation}
                onChange={handleVacancyInputChange}
                required={true}
              >
                <option value="">Всі локації</option>
                {locations.map((location) => (
                  <option key={location._id} value={location._id}>
                    {location.locationName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="salary">
              <Form.Label>Зарплата</Form.Label>
              <Form.Control
                type="number"
                placeholder="Введіть розмір зарплати"
                name="salary"
                value={vacancy.salary}
                required={true}
                onChange={handleVacancyInputChange}
                isInvalid={!!inputErrors.salary}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {" "}
                {inputErrors.salary}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="experience">
              <Form.Label>Досвід роботи</Form.Label>
              <Form.Control
                type="text"
                placeholder="Вкажіть необхідний досвід роботи"
                name="experience"
                required={true}
                value={vacancy.experience}
                onChange={handleVacancyInputChange}
                isInvalid={!!inputErrors.experience}
              />
              <Form.Control.Feedback type="invalid">
                {inputErrors.experience}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Опис вакансії</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Опишіть вакансію"
                name="description"
                required={true}
                value={vacancy.description}
                onChange={handleVacancyInputChange}
                isInvalid={!!inputErrors.description}
              />
              <Form.Control.Feedback type="invalid">
                {inputErrors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="mt-2">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="me-2"
              >
                Відхилити
              </Button>
              <Button variant="primary" type="submit">
                Зберегти
              </Button>
              {errMsg && (
                <Alert className="mt-3 w-100" variant="danger">
                  {errMsg}
                </Alert>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EmployerVacanyFull;
