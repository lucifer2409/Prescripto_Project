import React, { useContext } from 'react'
import { assets } from '../assets/assets_admin/assets';
import {useNavigate} from 'react-router-dom';
import { AdminContext } from '../context/AdminContext'


const Navbar = () => {
    const { atoken  , setAtoken} = useContext(AdminContext);
    const navigate = useNavigate()
    const logout = () => {
        navigate("/");
        atoken && setAtoken('');
        atoken && localStorage.removeItem('aToken');
    }
    return (
        <div>
            <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
                <div className='flex items-center gap-2 text-xs'>
                    <img src={assets.admin_logo} alt="admin_logo" className='w-36 cursor-pointer sm:w-40'/>
                    <p className='border px-2.5 py-0.5 rounded-full border-purple-200 text-blue-400'>{atoken ? 'Admin' : 'Doctor'}</p>
                </div>
            <button className='bg-primary text-white text-sm px-10 py-2 rounded-full' onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar
