import React, { useEffect, useState } from "react";
import axios from "../../axios.js";
import {
  Button,
  Card,
  Form,
  ListGroup,
  ListGroupItem,
  Modal,
  Alert,
} from "react-bootstrap";
import { BsCalendarCheck } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { Link } from "react-router-dom";
import UserVacancyService from "../../services/UserVacancyService.js";
import LocationService from "../../services/LocationService.js";
import CategoryService from "../../services/CategoryService.js";

function EmployerVacancyPreview() {
  const [fetchIsDone, setFetchIsDone] = useState(false);
  const [userVacancies, setUserVacancies] = useState(null);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [createdVacancy, setCreatedVacancy] = useState({
    position: "",
    category: "",
    jobLocation: "",
    salary: "",
    experience: "",
    description: "",
  });
  const [show, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [inputErrors, setInputErrors] = useState({
    position: null,
    salary: null,
    experience: null,
    description: null,
  });

  useEffect(() => {
    getVacancies();
  }, []);

  const handleVacancyInputChange = (e) => {
    setCreatedVacancy({
      ...createdVacancy,
      [e.target.name]: e.target.value,
    });
  };

  const handleShow = () => {
    setShow(true);
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
  };

  const handleClose = () => {
    setShow(false);
    getVacancies();
    setErrMsg(null);
    setInputErrors({
      position: null,
      salary: null,
      experience: null,
      description: null,
    });
    setCreatedVacancy({
      position: "",
      category: "",
      jobLocation: "",
      salary: "",
      experience: "",
      description: "",
    });
  };

  const getVacancies = () => {
    UserVacancyService.getAllVacancies().then((res) => {
      if (res.status === 200 && res.data.length > 0) {
        setUserVacancies(res.data);
      }
      setFetchIsDone(true);
    });
  };

  const handleCreateVacancy = (e) => {
    e.preventDefault();
    UserVacancyService.createVacancy(createdVacancy).then((res) => {
      if (res.status === 201) {
        setUserVacancies(res.data);
        setShow(false);
        setErrMsg(null);
        setInputErrors({
          position: null,
          salary: null,
          experience: null,
          description: null,
        });
        setCreatedVacancy({
          position: "",
          category: "",
          jobLocation: "",
          salary: "",
          experience: "",
          description: "",
        });
        console.log(userVacancies);
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

  return (
    <>
      <h3 className="mt-4">Ваші вакансії: </h3>
      {fetchIsDone && !userVacancies ? (
        <>
          <Card.Text>У Вас ще немає вакансій</Card.Text>
          <Button variant="primary" className="mb-2" onClick={handleShow}>
            Створити
          </Button>
        </>
      ) : (
        <>
          <Button variant="primary" className="mb-2" onClick={handleShow}>
            Створити
          </Button>
          <ListGroup>
            {userVacancies &&
              userVacancies.map((vacancy) => {
                return (
                  <ListGroupItem
                    key={vacancy._id}
                    as={Link}
                    to={`/account/employer/${vacancy._id}`}
                    style={{ textDecoration: "none" }}
                    className="mb-3 text-body border rounded"
                  >
                    <Card.Title>
                      {" "}
                      {vacancy.position} <br /> {vacancy.salary} UAH
                    </Card.Title>
                    <Card.Text className="text-muted mb-2">
                      <BsCalendarCheck /> Дата створення:{" "}
                      {vacancy.createdAt.slice(0, 10)}
                    </Card.Text>
                    <Card.Text>
                      <GoLocation /> Локація: {vacancy.jobLocation.locationName}
                    </Card.Text>
                    <Card.Text>
                      Категорія: {vacancy.category.categoryName}
                    </Card.Text>
                    <Card.Text>Досвід роботи: {vacancy.experience}</Card.Text>
                    <Card.Text className="text-truncate">
                      {vacancy.description}
                    </Card.Text>
                  </ListGroupItem>
                );
              })}
          </ListGroup>
        </>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Заповніть Ваше резюме</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateVacancy}>
            <Form.Group>
              <Form.Label>Оберіть категорію сфери роботи</Form.Label>
              <Form.Select
                name="category"
                value={createdVacancy.category}
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
                value={createdVacancy.position}
                onChange={handleVacancyInputChange}
                isInvalid={!!inputErrors.position}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Оберіть місце роботи</Form.Label>
              <Form.Select
                name="jobLocation"
                value={createdVacancy.jobLocation}
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
            <Form.Group>
              <Form.Label>Зарплата</Form.Label>
              <Form.Control
                type="number"
                placeholder="Введіть розмір зарплати"
                name="salary"
                value={createdVacancy.salary}
                required={true}
                onChange={handleVacancyInputChange}
                isInvalid={!!inputErrors.salary}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="experience">
              <Form.Label>Досвід роботи</Form.Label>
              <Form.Control
                type="text"
                placeholder="Вкажіть необхідний досвід роботи"
                name="experience"
                required={true}
                value={createdVacancy.experience}
                onChange={handleVacancyInputChange}
                isInvalid={!!inputErrors.experience}
              />
              <Form.Control.Feedback type="invalid">
                {inputErrors.skills}
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
                value={createdVacancy.description}
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

export default EmployerVacancyPreview;
