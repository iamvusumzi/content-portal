import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useSnackbar } from "../hooks/useSnackbar";

interface ProtectedRouteProps {
  requiredRole?: "USER" | "ADMIN";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { username, role } = useAuth();
  const { showMessage } = useSnackbar();

  if (!username) {
    showMessage("You must be logged in to access this page.", "error");
    return <Navigate to="/login" replace />;
  }

  if (role === "ADMIN") {
    return <Outlet />;
  }

  if (requiredRole && role !== requiredRole) {
    showMessage("You do not have permission to access this page.", "error");
    return <Navigate to="/access-denied" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
