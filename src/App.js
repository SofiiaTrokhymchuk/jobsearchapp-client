import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import MainPage from "./components/main/MainPage";
import MainNavbar from "./components/main/MainNavbar";
import Footer from "./components/main/Footer";
import JobseekerMain from "./components/jobseeker/JobseekerMain";
import EmployerMain from "./components/employer/EmployerMain";
import RegistrationTypeChoice from "./components/auth/RegistrationTypeChoice";
import JobseekerRegistartion from "./components/auth/JobseekerRegistartion";
import EmployerRegistration from "./components/auth/EmployerRegistration";
import Login from "./components/auth/Login";
import UserProfile from "./components/main/UserProfile";
import ResumeFullCard from "./components/resume/ResumeFullCard";
import VacancyFullCard from "./components/vacancy/VacancyFullCard";
import AuthService from "./services/AuthService";
import EmployerVacanyFull from "./components/employer/EmployerVacanyFull";
import PageNotFound from "./components/main/PageNotFound";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import AccountConfirmation from "./components/main/AccountConfirmation";
import VerifyEmail from "./components/main/VerifyEmail";

function App() {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <div className="vh-100 main-bg">
      <MainNavbar currentUser={currentUser} setAppUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/vacancies" element={<JobseekerMain />} />
        <Route path="/vacancies/:id" element={<VacancyFullCard />} />

        <Route path="/resumes" element={<EmployerMain />} />
        <Route path="/resumes/:id" element={<ResumeFullCard />} />

        <Route path="/registration" element={<RegistrationTypeChoice />} />
        <Route
          path="/registration/jobseeker"
          element={<JobseekerRegistartion />}
        />
        <Route
          path="/registration/employer"
          element={<EmployerRegistration />}
        />
        <Route path="/login" element={<Login setAppUser={setCurrentUser} />} />
        <Route
          path="/confirm/:confirmationCode"
          element={<AccountConfirmation />}
        />

        <Route
          element={
            <ProtectedRoutes currentUser={currentUser} role={"JOBSEEKER"} />
          }
        >
          <Route
            path="/account/jobseeker"
            element={<UserProfile currentUser={currentUser} />}
          />
        </Route>
        <Route
          element={
            <ProtectedRoutes currentUser={currentUser} role={"EMPLOYER"} />
          }
        >
          <Route
            path="/account/employer"
            element={<UserProfile currentUser={currentUser} />}
          />
          <Route
            path="/account/employer/:id"
            element={<EmployerVacanyFull />}
          />
        </Route>
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
