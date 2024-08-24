import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader";

const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const { token, user, loading } = useSelector((state) => state.user);
  // console.log(token);

  if (!token) {
    return <Navigate to={redirectPath} />;
  }

  if(loading && user === null) {
    return <Loader />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
