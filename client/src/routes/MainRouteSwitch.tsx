import React, { useEffect, useState } from 'react'
import {Route, Routes, Navigate } from "react-router-dom"
import LandingPage from '../Screens/LandingPage'
import LoginPage from '../Screens/LoginPage'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import SignupPage from '../Screens/SignupPage'

const MainRouteSwitch = () => {
  const [user,setUser] = useState(auth.currentUser);
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  return (
    <Routes>
      <Route path="/" element={user ? <LandingPage /> : <Navigate to='/login'/> } />
      <Route path="/login" element={user ? <Navigate to='/' /> : <LoginPage />} />
      <Route path='/signup' element={user ? <Navigate to='/' />:<SignupPage />}></Route>

    </Routes>
  )
}

export default MainRouteSwitch
