import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ redirectPath = '/login' }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  // console.log(isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;