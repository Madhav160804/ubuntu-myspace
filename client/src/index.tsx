import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './routes/MainApp';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css'
import './assets/scss/index.scss';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";

// import "react-input-range/lib/css/index.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <MainApp />
);
