import React, { useEffect, useState } from "react";
import { Navbar, Form, Button, Container} from "react-bootstrap";
import VacancyPreviewCard from "../vacancy/VacancyPreviewCard.js";
import { useNavigate } from "react-router-dom";
import handleQueryString from "../../utils/QueryStringHandler.js";
import LocationService from "../../services/LocationService.js";
import CategoryService from "../../services/CategoryService.js";
import MainVacancyService from "../../services/MainVacancyService.js";

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
    MainVacancyService.getAllVacancies().then((res) => {
      if (res.status === 200) {
        setVacancies(res.data);
        setFetchIsDone(true);
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
    MainVacancyService.getFillteredVacancies(queryString).then((res) => {
      setVacancies(res.data);
    });
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
