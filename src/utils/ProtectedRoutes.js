import React from "react";
import { Outlet } from "react-router-dom";
import ForbiddenRout from "../components/main/ForbiddenRout";

function JobseekerProtectedRoutes({ currentUser, role }) {
  return currentUser.user.role.roleName === role ? (
    <Outlet />
  ) : (
    <ForbiddenRout />
  );
}

export default JobseekerProtectedRoutes;
