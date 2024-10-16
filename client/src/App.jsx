import React from 'react';
import "antd/dist/reset.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login';
import Register from './pages/register';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/publicRoute';

function App() {
  const { loading } = useSelector(state => state.alerts);
  return (
    <div>
      <BrowserRouter>
        {
          loading && (
            <div className='spinner-parent'>
              <div className="spinner-border" role="status">
              </div>
            </div>
          )
        }
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
          <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />

        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
