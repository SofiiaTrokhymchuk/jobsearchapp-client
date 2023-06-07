import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios.js";
import { Container, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { BsCalendarCheck } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { BiBuildingHouse } from "react-icons/bi";

function VacancyFullCard() {
  const [vacancy, setVacancy] = useState();
  const { id } = useParams();
  useEffect(() => {
    axios.get(`/vacancies/${id}`).then((res) => setVacancy(res.data.vacancy));
  }, []);
  return (
    vacancy && (
      <div className="mb-5 pb-5">
        <Container className="pt-2 mb-5">
          <Card>
            <Card.Header>
              {" "}
              <Card.Title className="fs-2">
                {" "}
                {vacancy.position} <br /> {vacancy.salary} UAH
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h6>Дані про роботодавця:</h6>
                  <Card.Text>
                    <BiBuildingHouse /> Компанія:{" "}
                    {vacancy.employerId.dynamicUserAttributes.companyName}
                  </Card.Text>
                  <Card.Text>
                    <GoLocation /> Локація: {vacancy.jobLocation.locationName}
                  </Card.Text>
                  <Card.Text>
                    <AiOutlineMail /> Ел. пошта:{" "}
                    <a href={`mailto:${vacancy.employerId.email}`}>
                      {vacancy.employerId.email}
                    </a>
                  </Card.Text>
                  <Card.Text>
                    <AiOutlinePhone /> Номер телефону:{" "}
                    <a href={`tel:${vacancy.employerId.phoneNumber}`}>
                      {vacancy.employerId.phoneNumber}
                    </a>
                  </Card.Text>
                </ListGroupItem>
                <ListGroupItem>
                  <Card.Title className="fs-3">Опис вакансії</Card.Title>
                  <Card.Text className="text-muted mb-2">
                    <BsCalendarCheck /> Дата створення:{" "}
                    {vacancy.createdAt.slice(0, 10)}
                  </Card.Text>
                  <Card.Text>
                    Категорія: {vacancy.category.categoryName}
                  </Card.Text>
                  <Card.Text>Досвід роботи: {vacancy.experience}</Card.Text>
                  <Card.Text>{vacancy.description}</Card.Text>
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        </Container>
      </div>
    )
  );
}

export default VacancyFullCard;
