import React, { useEffect } from "react";
import Allcomponents from "./components/Allcomponents";
import Nav from "./components/Nav";
import Login from "./components/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Pages/ProtectedRoute";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const App = () => {
  const { error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error === "Token has expired"){
      toast.error("Session Expired!");
    } else if (error === "Token is not valid"){
      toast.error("Invalid Session!");
    } else {
      toast.error(error)
    }
  }, [error]);

  return (
    <>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Allcomponents />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
