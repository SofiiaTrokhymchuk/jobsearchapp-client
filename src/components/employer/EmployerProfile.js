import React from "react";
import { BiBuildingHouse } from "react-icons/bi";
import { Card } from "react-bootstrap";
import EmployerVacancyPreview from "./EmployerVacancyPreview";

function EmployerProfile(props) {
  return (
    <>
      <Card.Text className="mb-2">
        <BiBuildingHouse /> Назва компанії: {props.employer.companyName}
      </Card.Text>
      <EmployerVacancyPreview />
    </>
  );
}

export default EmployerProfile;
