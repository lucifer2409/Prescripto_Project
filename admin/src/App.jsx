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

const App = () => {
  const { atoken } = useContext(AdminContext);
  return atoken ?
    (
      <div className='bg-[#F8F9FD]'>
        <ToastContainer />
        <Navbar />
        <div className='flex items-start'>
          <Sidebar />
          <Routes>
            <Route path='/' element={<></>} />
            <Route path='/admin-dashboard' element={<Dashboard/>} />
            <Route path='/all-appointments' element={<Allappointments/>}/>
            <Route path='/add-doctor' element={<Adddoctor/>}/>
            <Route path='/doctor-list' element={<Doctorslist/>}/>
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
