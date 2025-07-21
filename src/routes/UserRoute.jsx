import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import Loading from "../pages/shared/Loading/Loading";

const UserRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, isLoading: roleLoading } = useUserRole();
  const location = useLocation();

  if (authLoading || roleLoading) {
    return <Loading />;
  }

  if (!user || role !== "user") {
    return <Navigate to="/forbidden" state={{ from: location.pathname }} />;
  }

  return children;
};

export default UserRoute;
