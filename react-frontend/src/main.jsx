import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ToastContainer } from 'react-toastify'; // ✅ Import toast container
import 'react-toastify/dist/ReactToastify.css';  // ✅ Import toast styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer position="top-right" autoClose={3000} /> {/* ✅ Toast setup */}
    </BrowserRouter>
  </React.StrictMode>
);
