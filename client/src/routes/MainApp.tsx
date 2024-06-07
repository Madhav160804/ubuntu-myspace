import React from 'react'
import {BrowserRouter as Router} from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import MainRoute from './MainRoute';

const MainApp = () => {
  return (
    <Router>
        <MainRoute />

        <ToastContainer 
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            draggable={false}
            position="top-right"
            rtl={false}
            autoClose={2000}
        />
    </Router>
  )
}

export default MainApp
