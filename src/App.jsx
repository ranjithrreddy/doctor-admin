import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AdminContext } from './context/AdminContext'
import { DoctorContext } from './context/DoctorContext'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'

// Admin Pages
import Dashboard from './pages/Admin/Dashboard'
import AllAppointments from './pages/Admin/AllAppointments'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorsList from './pages/Admin/DoctorsList'

// Doctor Pages
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import { DoctorProfile } from './pages/Doctor/DoctorProfile'

const App = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return (
    <>
      {aToken || dToken ? (
        <div className="bg-[#F8F9FD] min-h-screen">
          <Navbar />
          <div className="flex items-start">
            <Sidebar />

            <div className="flex-1 p-4">
              <Routes>
                {/* Default redirect based on role */}
                <Route
                  path="/"
                  element={
                    aToken ? (
                      <Navigate to="/admin-dashboard" />
                    ) : dToken ? (
                      <Navigate to="/doctor-dashboard" />
                    ) : (
                      <Login />
                    )
                  }
                />

                {/* Admin Routes */}
                <Route path="/admin-dashboard" element={<Dashboard />} />
                <Route path="/all-appointments" element={<AllAppointments />} />
                <Route path="/add-doctor" element={<AddDoctor />} />
                <Route path="/doctor-list" element={<DoctorsList />} />

                {/* Doctor Routes */}
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="/doctor-appointments" element={<DoctorAppointments />} />
                <Route path="/doctor-profile" element={<DoctorProfile />} />

                {/* Fallback for invalid URLs */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}

      {/* Global toast */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  )
}

export default App
