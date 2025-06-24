import React from "react";
import { useAuth } from "../context/authcontext";
import { Navigate } from "react-router-dom";

const RoleBaseRoutes = ({ childeren, requiredRole }) => {
  const { user, laoding } = useAuth();
  if (laoding) {
    <div>Loading......</div>;
  }
  if (!requiredRole.includes(user.role)) {
    <Navigate to="Unauthorized" />;
  }
  return user ? childeren : <Navigate to="login" />;
};
export default RoleBaseRoutes;
