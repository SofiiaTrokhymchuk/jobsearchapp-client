import React from "react";
import { Outlet } from "react-router-dom";
import ForbiddenRout from "../components/main/ForbiddenRout";

function ProtectedRoutes({ currentUser, role }) {
  return currentUser && currentUser.user.role.roleName === role ? (
    <Outlet />
  ) : (
    <ForbiddenRout />
  );
}

export default ProtectedRoutes;
