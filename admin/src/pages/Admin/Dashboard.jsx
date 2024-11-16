import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react';
import { assets } from '../../assets/assets_admin/assets';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
  const { atoken, getDashData, dashdata, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const {slotDateFormat} = useContext(AppContext);
  useEffect(() => {
    if (atoken) {
      getDashData();
    }
  }, [atoken])
  return dashdata && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>


        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.doctor_icon} alt="doctorIcon" className='w-14' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashdata.doctors}</p>
            <p className='text-gray-400'>Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.appointments_icon} alt="doctorIcon" className='w-14' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashdata.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.patients_icon} alt="doctorIcon" className='w-14' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashdata.patients}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {
            dashdata.latestAppointments.map((item, index) => (
              <div key={index} className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100'>
                <img src={item.docData.image} alt="" className='rounded-full w-10'/>
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                  <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> :
                  <img src={assets.cancel_icon} alt="cancelIcon" className='w-10 cursor-pointer' onClick={() => cancelAppointment(item._id)} />
                }
              </div>
            ))
          }
        </div>


      </div>
    </div>
  )
}

export default Dashboard
