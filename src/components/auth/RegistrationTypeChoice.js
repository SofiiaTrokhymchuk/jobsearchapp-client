import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function RegistrationTypeChoice() {
  return (
    <>
      <Container className="d-flex justify-content-center align-items-center mt-5">
        <div className="text-center">
          <p className="fs-4">Зареєструватись як:</p>
          <Button
            variant="primary"
            as={Link}
            to={`/registration/jobseeker`}
            className="me-1"
          >
            Кандидат
          </Button>
          <Button
            variant="primary"
            as={Link}
            to={`/registration/employer`}
            className="me-1"
          >
            Роботодавець
          </Button>
        </div>
      </Container>
      {/* <Routes>
        <Route path={`/jobseeker`} element={<JobseekerRegistartion />} />
        <Route path={`/employer`} element={<EmployerRegistration />} />
      </Routes> */}
    </>
  );
}

export default RegistrationTypeChoice;
