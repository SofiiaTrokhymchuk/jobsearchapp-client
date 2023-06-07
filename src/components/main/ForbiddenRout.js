import React from "react";
import { Alert, Container } from "react-bootstrap";

function ForbiddenRout() {
  return (
    <Container className="mt-3">
      <Alert variant="danger">Доступ до сторінки заборонений!</Alert>
    </Container>
  );
}

export default ForbiddenRout;
