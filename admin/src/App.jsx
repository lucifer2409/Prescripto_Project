import React, { useContext } from 'react'
import Login from './pages/Login'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import Allappointments from './pages/Admin/Allappointments';
import Adddoctor from './pages/Admin/Adddoctor';
import Doctorslist from './pages/Admin/Doctorslist';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {
  const { atoken } = useContext(AdminContext);
  const {dtoken} = useContext(DoctorContext);
  return atoken || dtoken?
    (
      <div className='bg-[#F8F9FD]'>
        <ToastContainer />
        <Navbar />
        <div className='flex items-start'>
          <Sidebar />
          <Routes>
            {/* Admin Routes */}
            <Route path='/' element={<></>} />
            <Route path='/admin-dashboard' element={<Dashboard/>} />
            <Route path='/all-appointments' element={<Allappointments/>}/>
            <Route path='/add-doctor' element={<Adddoctor/>}/>
            <Route path='/doctor-list' element={<Doctorslist/>}/>

            {/* Doctor routes */}
            <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
            <Route path='/doctor-appointments' element={<DoctorAppointment/>}/>
            <Route path='/doctor-profile' element={<DoctorProfile/>}/>
          </Routes>
        </div>
      </div>
    ) : (
      <>
        <Login />
        <ToastContainer />
      </>
    )
}

export default App
