import React, { useEffect, useState } from "react";
import axios from "../../axios.js";
import { Button, Card, Modal, Form, Alert } from "react-bootstrap";
import { BsCalendarCheck } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import LocationService from "../../services/LocationService.js";
import UserResumeService from "../../services/UserResumeService.js";

function JobseekerResume() {
  const [show, setShow] = useState(false);
  const [locations, setLocations] = useState([]);
  const [userResume, setUserResume] = useState({
    position: "",
    desiredJobLocation: "",
    desiredJobLocationName: "",
    skills: "",
    experience: "",
    createdAt: "",
    updatedAt: "",
  });
  const [resumeIsUpdated, setResumeIsUpdated] = useState(false);
  const [fetchIsDone, setFetchIsDone] = useState(false);
  const [userHasResume, setUserHasResume] = useState(false);

  const [errMsg, setErrMsg] = useState(null);
  const [inputErrors, setInputErrors] = useState({
    position: null,
    skills: null,
    experience: null,
  });

  const handleClose = () => {
    setShow(false);
    getResume();
    setErrMsg(null);
    setInputErrors({
      position: null,
      skills: null,
      experience: null,
    });
  };

  const handleShow = () => {
    setShow(true);
    LocationService.getLocations().then((res) => {
      if (res.status === 200) {
        setLocations(res.data);
      }
    });
  };

  const handleResumeInputChange = (e) => {
    setUserResume({
      ...userResume,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getResume();
  }, []);

  const getResume = () => {
    UserResumeService.getResume().then((res) => {
      if (res.data) {
        const {
          position,
          desiredJobLocation,
          skills,
          experience,
          createdAt,
          updatedAt,
        } = res.data;
        setUserResume({
          position,
          skills,
          experience,
          createdAt,
          updatedAt,
          desiredJobLocation: desiredJobLocation._id,
          desiredJobLocationName: desiredJobLocation.locationName,
        });
        setUserHasResume(true);
        setResumeIsUpdated(true);
      }
      setFetchIsDone(true);
    });
  };

  const handleCreateResume = () => {
    UserResumeService.createResume(userResume).then((res) => {
      if (res.status === 201) {
        setUserResume(res.data);
        setShow(false);
        setErrMsg(null);
        setInputErrors({
          position: null,
          skills: null,
          experience: null,
        });
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

  const handleUpdateResume = () => {
    UserResumeService.updateResume(userResume).then((res) => {
      if (res.status === 200) {
        setErrMsg(null);
        setInputErrors({
          position: null,
          skills: null,
          experience: null,
        });
        setUserResume(res.data);
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

  const handleDeleteResume = () => {
    UserResumeService.deleteResume().then((res) => {
      if (res.status === 200) {
        setUserResume({
          position: "",
          desiredJobLocation: "",
          desiredJobLocationName: "",
          skills: "",
          experience: "",
          createdAt: "",
          updatedAt: "",
        });
        setUserHasResume(false);
        setResumeIsUpdated(false);
      }
    });
  };

  const handleSaveResume = (e) => {
    e.preventDefault();
    resumeIsUpdated ? handleUpdateResume() : handleCreateResume();
  };

  return (
    <>
      <h3 className="mt-4">Ваше резюме: </h3>
      {fetchIsDone && userHasResume ? (
        <>
          <Card.Text className="text-muted mb-2">
            <BsCalendarCheck /> Дата створення:{" "}
            {userResume.createdAt.slice(0, 10)}
          </Card.Text>
          <Card.Text className="text-muted mb-2">
            <BsCalendarCheck /> Останній раз змінено:{" "}
            {userResume.updatedAt.slice(0, 10)}
          </Card.Text>
          <Card.Title>Бажане місце роботи</Card.Title>
          <Card.Text>
            <GoLocation /> {userResume.desiredJobLocationName}
          </Card.Text>
          <Card.Title>Посада</Card.Title>
          <Card.Text>{userResume.position}</Card.Text>
          <Card.Title>Попередній досвід</Card.Title>
          <Card.Text>{userResume.experience}</Card.Text>
          <Card.Title>Навички</Card.Title>
          <Card.Text>{userResume.skills}</Card.Text>
          <Button className="me-2" variant="secondary" onClick={handleShow}>
            Редагувати
          </Button>
          <Button variant="danger" onClick={handleDeleteResume}>
            Видалити
          </Button>
        </>
      ) : (
        <>
          <Card.Text>У Вас ще немає резюме</Card.Text>
          <Button variant="primary" onClick={handleShow}>
            Створити
          </Button>
        </>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Заповніть Ваше резюме</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveResume}>
            <Form.Group controlId="position">
              <Form.Label>Ваша посада</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введіть назву посади"
                name="position"
                required={true}
                value={userResume.position}
                onChange={handleResumeInputChange}
                isInvalid={!!inputErrors.position}
              />
              <Form.Control.Feedback type="invalid">
                {inputErrors.position}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Оберіть бажане місце роботи</Form.Label>
              <Form.Select
                name="desiredJobLocation"
                value={userResume.desiredJobLocation}
                onChange={handleResumeInputChange}
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
            <Form.Group controlId="experience">
              <Form.Label>Ваша досвід</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Опишіть ваш попередній досвід роботи"
                name="experience"
                required={true}
                value={userResume.experience}
                onChange={handleResumeInputChange}
                isInvalid={!!inputErrors.experience}
              />
              <Form.Control.Feedback type="invalid">
                {inputErrors.experience}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="experience">
              <Form.Label>Ваші навички</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Опишіть ваші навички"
                name="skills"
                required={true}
                value={userResume.skills}
                onChange={handleResumeInputChange}
                isInvalid={!!inputErrors.skills}
              />
              <Form.Control.Feedback type="invalid">
                {inputErrors.skills}
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

export default JobseekerResume;
