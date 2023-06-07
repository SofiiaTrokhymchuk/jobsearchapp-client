import React, { useEffect, useState } from "react";
import { Navbar, Form, Button, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../axios.js";
import VacancyPreviewCard from "../vacancy/VacancyPreviewCard.js";
import { useNavigate } from "react-router-dom";
import handleQueryString from "../../utils/QueryStringHandler.js";

function JobseekerMain() {
  const [selectedFilters, setSelectedFilters] = useState({
    position: "",
    category: "",
    jobLocation: "",
    salary: "",
  });
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [fetchIsDone, setFetchIsDone] = useState(false);

  useEffect(() => {
    axios
      .get("/categories")
      .then((res) =>
        res.data.categories.sort((a, b) =>
          a.categoryName.localeCompare(b.categoryName)
        )
      )
      .then((data) => setCategories(data))
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
    axios
      .get("/vacancies")
      .then((res) =>
        res.data.vacancies.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        )
      )
      .then((data) => {
        setVacancies(data);
      })
      .then(() => setFetchIsDone(true))
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
    console.log(selectedFilters);
    const queryString = handleQueryString(selectedFilters);
    axios
      .get(`/vacancies?${queryString}`)
      .then((res) =>
        res.data.vacancies.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      )
      .then((data) => {
        setVacancies(data);
      })
      .catch((e) => console.log(e));
    queryString === "&"
      ? navigate("/vacancies")
      : navigate(`/vacancies?${queryString}`);
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
              name="category"
              value={selectedFilters.category}
              onChange={handleFilterInputChange}
            >
              <option value="">Всі категорії</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </Form.Select>
            <Form.Select
              name="jobLocation"
              value={selectedFilters.jobLocation}
              onChange={handleFilterInputChange}
            >
              <option value="">Всі локації</option>
              {locations.map((location) => (
                <option key={location._id} value={location._id}>
                  {location.locationName}
                </option>
              ))}
            </Form.Select>
            <Form.Control
              type="number"
              placeholder="Мін. зарплатня"
              name="salary"
              value={selectedFilters.salary}
              onChange={handleFilterInputChange}
            />
            <Button variant="primary" type="submit">
              Знайти
            </Button>
          </Form>
        </Container>
      </Navbar>
      <Container className="pt-2 pb-5 mb-3">
        {fetchIsDone && !vacancies.length > 0 ? (
          <p className="fs-5">
            На жаль, за Вашим запитом не знайдено жодної вакансії
          </p>
        ) : (
          vacancies.map((vacancy) => {
            return <VacancyPreviewCard vacancy={vacancy} key={vacancy._id} />;
          })
        )}
      </Container>
    </>
  );
}

export default JobseekerMain;
