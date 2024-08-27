import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader";

const ProtectedRoute = ({ children, token, redirectPath = "/login" }) => {
  const { loading } = useSelector((state) => state.user);

  if (loading && token) {
    return <Loader />;
  }

  if (!token) {
    return <Navigate to={redirectPath} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
