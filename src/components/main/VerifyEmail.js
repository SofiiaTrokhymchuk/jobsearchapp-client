import React from "react";
import { Container, Alert } from "react-bootstrap";

function VerifyEmail() {
  return (
    <Container className="mt-3">
      <Alert variant="info">
        Ваш акаунт зареєстровано! <br /> Будь ласка, підтвердіть Вашу електронну
        пошту протягом 15 хвилин.
      </Alert>
    </Container>
  );
}

export default VerifyEmail;
