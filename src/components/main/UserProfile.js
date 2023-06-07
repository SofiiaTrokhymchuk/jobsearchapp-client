import React from "react";
import { Container, Card } from "react-bootstrap";
import EmployerProfile from "../employer/EmployerProfile";
import JobseekerProfile from "../jobseeker/JobseekerProfile";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineCalendar,
} from "react-icons/ai";
import { BsCalendarCheck } from "react-icons/bs";

function UserProfile(props) {
  return (
    <div className="pb-1 mb-5">
      <Container className="mt-2 mb-5 pb-5">
        <Card>
          <Card.Body>
            <h1 className="mb-4">
              Ваш профіль{" "}
              {props.currentUser.user.role.roleName === "JOBSEEKER"
                ? "кандидата"
                : "роботодавця"}
            </h1>
            <h3 className="mb-3">{props.currentUser.user.fullName}</h3>
            <Card.Text className="text-muted mb-2">
              <BsCalendarCheck /> Дата реєстрації:{" "}
              {props.currentUser.user.createdAt.slice(0, 10)}
            </Card.Text>
            <Card.Text className="mb-2">
              <AiOutlineMail /> Ел. пошта: {props.currentUser.user.email}
            </Card.Text>
            <Card.Text className="mb-2">
              <AiOutlinePhone /> Номер телефону:{" "}
              {props.currentUser.user.phoneNumber}
            </Card.Text>

            {props.currentUser.user.role.roleName === "JOBSEEKER" ? (
              <JobseekerProfile
                jobseeker={props.currentUser.user.dynamicUserAttributes}
              />
            ) : (
              <EmployerProfile
                employer={props.currentUser.user.dynamicUserAttributes}
              />
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default UserProfile;
