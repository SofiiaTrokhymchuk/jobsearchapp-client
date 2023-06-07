import React, { useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AuthService from "../../services/AuthService";

function AccountConfirmation() {
  const { confirmationCode } = useParams();

  useEffect(() => {
    AuthService.verifyUser(confirmationCode);
  }, []);
  return (
    <Container className="mt-3">
      <Alert variant="success">
        Ваш акаунт підтверджено! <br /> Будь ласка, увійдіть в свій обліковий
        запис.
      </Alert>
    </Container>
  );
}

export default AccountConfirmation;
