import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios.js";
import { Container, Card, ListGroup } from "react-bootstrap";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineCalendar,
} from "react-icons/ai";
import { BsCalendarCheck } from "react-icons/bs";
import { GoLocation } from "react-icons/go";

function ResumeFullCard() {
  const [resume, setResume] = useState();
  const { id } = useParams();
  useEffect(() => {
    axios.get(`/resumes/${id}`).then((res) => setResume(res.data.resume));
  }, []);
  return (
    resume && (
      <div className="mb-5 pb-5">
        <Container className="pt-2 mb-5">
          <Card>
            <Card.Header>
              {" "}
              <Card.Title className="fs-2">
                {" "}
                {resume.jobseekerId.fullName}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Title className="mb-3">{resume.position}</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h6>Особисті дані кандидата:</h6>
                  <Card.Text>
                    <AiOutlineMail /> Ел. пошта:{" "}
                    <a href={`mailto:${resume.jobseekerId.email}`}>
                      {resume.jobseekerId.email}
                    </a>
                  </Card.Text>
                  <Card.Text>
                    <AiOutlinePhone /> Номер телефону:{" "}
                    <a href={`tel:${resume.jobseekerId.phoneNumber}`}>
                      {resume.jobseekerId.phoneNumber}
                    </a>
                  </Card.Text>
                  <Card.Text>
                    <AiOutlineCalendar /> Дата народження:{" "}
                    {resume.jobseekerId.dynamicUserAttributes.birthdate}
                  </Card.Text>
                  <Card.Text>
                    <GoLocation /> Бажане місце роботи:{" "}
                    {resume.desiredJobLocation.locationName}
                  </Card.Text>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Card.Title className="fs-3">Опис резюме</Card.Title>
                  <Card.Text className="text-muted mb-2">
                    <BsCalendarCheck /> Дата створення:{" "}
                    {resume.createdAt.slice(0, 10)}
                  </Card.Text>
                  {resume.experience && (
                    <>
                      <Card.Title>Попередній досвід</Card.Title>
                      <Card.Text>{resume.experience}</Card.Text>
                    </>
                  )}
                  <Card.Title>Навички</Card.Title>
                  <Card.Text>{resume.skills}</Card.Text>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Container>
      </div>
    )
  );
}

export default ResumeFullCard;
