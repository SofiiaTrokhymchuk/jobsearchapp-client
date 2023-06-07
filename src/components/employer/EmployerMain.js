import React, { useEffect, useState } from "react";
import { Navbar, Form, Button, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../axios.js";
import ResumePreviewCard from "../resume/ResumePreviewCard.js";
import { useNavigate } from "react-router-dom";
import handleQueryString from "../../utils/QueryStringHandler.js";

function EmployerMain() {
  const [locations, setLocations] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [fetchIsDone, setFetchIsDone] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    position: "",
    desiredJobLocation: "",
  });

  useEffect(() => {
    axios
      .get("/resumes")
      .then((res) =>
        res.data.resumes.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        )
      )

      .then((resumes) => setResumes(resumes))
      .then(() => setFetchIsDone(true))
      .catch((e) => console.log(e));
    axios
      .get("/locations")
      .then((res) =>
        res.data.locations.sort((a, b) =>
          a.locationName.localeCompare(b.locationName)
        )
      )
      .then((data) => setLocations(data))
      .catch((e) => console.log(e));
  }, []);

  const handleFilterInputChange = (e) => {
    setSelectedFilters({
      ...selectedFilters,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const queryString = handleQueryString(selectedFilters);
    axios
      .get(`/resumes?${queryString}`)
      .then((res) =>
        res.data.resumes.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      )
      .then((resumes) => setResumes(resumes))
      .catch((e) => console.log(e));
    queryString === "&"
      ? navigate("/resumes")
      : navigate(`/resumes?${queryString}`);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Form
            className="d-flex d-sm-flex flex-column flex-md-row gap-2"
            onSubmit={handleSearchSubmit}
          >
            <Form.Control
              type="text"
              placeholder="Назва посади"
              name="position"
              value={selectedFilters.position}
              onChange={handleFilterInputChange}
            />
            <Form.Select
              name="desiredJobLocation"
              value={selectedFilters.desiredJobLocation}
              onChange={handleFilterInputChange}
            >
              <option value="">Всі локації</option>
              {locations.map((location) => (
                <option key={location._id} value={location._id}>
                  {location.locationName}
                </option>
              ))}
            </Form.Select>
            <Button variant="primary" type="submit">
              Знайти
            </Button>
          </Form>
        </Container>
      </Navbar>
      <Container className="pt-2 pb-5 mb-3">
        {fetchIsDone && !resumes.length > 0 ? (
          <p className="fs-5">
            На жаль, за Вашим запитом не знайдено жодного резюме
          </p>
        ) : (
          resumes.map((resume) => {
            return <ResumePreviewCard resume={resume} key={resume._id} />;
          })
        )}
      </Container>
    </>
  );
}

export default EmployerMain;
