import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets_admin/assets';
import { cancelAppointment } from '../../../../backend/controllers/Usercontroller';
const DoctorAppointment = () => {
    const {calculateAge , slotDateFormat , currency} = useContext(AppContext);
    const { dtoken, appointments, getAppointments , appointmentCancel , appointmentComplete} = useContext(DoctorContext);

    useEffect(() => {
        if (dtoken) {
            console.log(dtoken);
            getAppointments();
        }
    }, [dtoken]);

    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-medium'>
                All Appointments
            </p>
            <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
                <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p>Action</p>
                </div>

                {
                    appointments.map((item , index)=> (
                        <div key={index} className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'>  
                            <p className='max-sm:hidden'>{index+1}</p>
                            <div className='flex items-center gap-2'>
                                <img src={item.userData.image} alt="" className='w-8 rounded-full'/>
                                <p>{item.userData.name}</p>
                            </div>
                            <div>
                               <p className='text-xs inline border border-primary px-2 rounded full'>
                                {item.payment ? 'Online' : 'CASH'}
                                </p> 
                            </div>
                            <p className='max-sm:hidden'>
                                {calculateAge(item.userData.dob)}
                            </p>
                            <p>
                                {slotDateFormat(item.slotDate)} , {item.slotTime}
                            </p>
                            <p>
                                {currency}{item.amount}
                            </p>
                            <div className='flex'>
                                <img src={assets.cancel_icon} className='w-10 cursor-pointer' alt="" onClick={()=>cancelAppointment(item._id)}/>
                                <img className='w-10 cursor-pointer' src={assets.tick_icon} alt="" onClick={() => appointmentComplete(item._id)}/>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default DoctorAppointment
