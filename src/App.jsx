import React from 'react'
import Allcomponents from './components/Allcomponents'
import Nav from './components/Nav'
import Login from './components/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './Pages/ProtectedRoute'

const App = () => {


  return (
    <>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Allcomponents />} />
          </Route>
          {/* <Route path="/" element={<Allcomponents />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App