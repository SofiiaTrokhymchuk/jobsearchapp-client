import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Form, Button, Container, Card } from "react-bootstrap";
import { GoLocation } from "react-icons/go";
import { BiBuildingHouse, BiCategory } from "react-icons/bi";
import { BsCalendarCheck } from "react-icons/bs";

function VacancyPreviewCard(props) {
  return (
    <Card
      as={Link}
      to={`/vacancies/${props.vacancy._id}`}
      className="mb-4 w-100 text-body"
      style={{ textDecoration: "none" }}
    >
      <Card.Body>
        <small className=" text-muted">
          <BsCalendarCheck /> {props.vacancy.createdAt.slice(0, 10)}
        </small>
        <Card.Title className="mt-2">{props.vacancy.position}</Card.Title>
        <Card.Title className="mb-2 text-dark">
          {props.vacancy.salary} UAH
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <BiCategory /> {props.vacancy.category.categoryName}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          <BiBuildingHouse />{" "}
          {props.vacancy.employerId.dynamicUserAttributes.companyName}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          <GoLocation /> {props.vacancy.jobLocation.locationName}
        </Card.Subtitle>
        <Card.Text className="text-truncate">
          {props.vacancy.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default VacancyPreviewCard;
