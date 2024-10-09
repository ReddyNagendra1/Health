import React from 'react';
import "antd/dist/reset.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login';
import Register from './pages/register';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <Routes>
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* <Route path='/home' element={<Home />} /> */}

        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
