import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/hOME.JSX'
import Doctors from './pages/Doctors'
import About from './pages/About'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import Myappointments from './pages/Myappointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}>
        </Route>
        <Route path='/doctors' element={<Doctors />}>
        </Route>
        <Route path='/about' element={<About />}>
        </Route>
        <Route path='/doctors/:speciality' element={<Doctors />}>
        </Route>
        <Route path='/login' element={<Login />}>
        </Route>
        <Route path='/contact' element={<Contact />}>
        </Route>
        <Route path='/my-profile' element={<Profile />}>
        </Route>
        <Route path='/my-appointments' element={<Myappointments />}>
        </Route>
        <Route path='/appointment/:docId' element={<Appointment />}>
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
