import React, { useEffect } from 'react'
import Allcomponents from './components/Allcomponents'
import Nav from './components/Nav'
import Login from './components/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './Pages/ProtectedRoute'
import { useDispatch } from 'react-redux'
import { homepage } from './store/reducers/userSlice'
import { toast } from 'react-toastify'

const App = () => {
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(homepage()).then(result => {
  //     if (result.error) {
  //       toast.error("Please login to access the resouce.")
  //       // console.log(result.error.message)
  //     }
  //   })
  
  //   // return () => {
  //   //   second
  //   // }
  // }, [])
  

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