import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../axios.js";
import { GoLocation } from "react-icons/go";
import { BsCalendarCheck } from "react-icons/bs";

function ResumePreviewCard(props) {
  return (
    <Card
      as={Link}
      to={`/resumes/${props.resume._id}`}
      className="mb-4 w-100 text-body"
      style={{ textDecoration: "none" }}
    >
      <Card.Body>
        <small className=" text-muted">
          <BsCalendarCheck /> {props.resume.createdAt.slice(0, 10)}
        </small>
        <Card.Title className="mt-2">
          {props.resume.jobseekerId.fullName}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-dark">
          {props.resume.position}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          <GoLocation /> {props.resume.desiredJobLocation.locationName}
        </Card.Subtitle>
        <Card.Text className="text-truncate">{props.resume.skills}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ResumePreviewCard;
