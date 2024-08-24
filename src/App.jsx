import React, { useEffect } from "react";
import Homepage from "./Pages/Homepage";
import Nav from "./components/Nav";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Pages/ProtectedRoute";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const App = () => {
  const { error } = useSelector((state) => state.user);
  const { statementError, message } = useSelector((state) => state.statements);

  useEffect(() => {
    if (error === "Token has expired") {
      toast.error("Session Expired!");
    } else if (error === "Token is not valid") {
      toast.error("Invalid Session!");
    } else if (statementError) {
      toast.error(statementError.statusText)
    } else {
      toast.error(error);
    }
  }, [error, statementError]);

  return (
    <>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Homepage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
