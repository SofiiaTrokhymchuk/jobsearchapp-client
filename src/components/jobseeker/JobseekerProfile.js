import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { Card } from "react-bootstrap";
import JobseekerResume from "./JobseekerResume";

function JobseekerProfile(props) {
  return (
    <>
      <Card.Text className="mb-2">
        <AiOutlineCalendar /> Дата народження: {props.jobseeker.birthdate}
      </Card.Text>
      <JobseekerResume />
    </>
  );
}

export default JobseekerProfile;
