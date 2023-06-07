import React, { useEffect, useState } from "react";
import { Navbar, Form, Button, Container } from "react-bootstrap";
import ResumePreviewCard from "../resume/ResumePreviewCard.js";
import { useNavigate } from "react-router-dom";
import handleQueryString from "../../utils/QueryStringHandler.js";
import MainResumeService from "../../services/MainResumeService.js";
import LocationService from "../../services/LocationService.js";

function EmployerMain() {
  const [locations, setLocations] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [fetchIsDone, setFetchIsDone] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    position: "",
    desiredJobLocation: "",
  });

  useEffect(() => {
    MainResumeService.getAllResumes().then((res) => {
      if (res.status === 200) {
        setResumes(res.data);
        setFetchIsDone(true);
      }
    });
    LocationService.getLocations().then((res) => {
      if (res.status === 200) {
        setLocations(res.data);
      }
    });
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
    MainResumeService.getFillteredResumes(queryString).then((res) => {
      setResumes(res.data);
    });
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
