import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

const Myappointments = () => {

  const { backendURL, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const months = ['', "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", 'Dec'];

  
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }
  const navigate = useNavigate();
  const getuserappointments = async () => {
    try {
      const { data } = await axios.get(backendURL + '/api/user/appointments', { headers: { token } });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.message);

    }
  }

  useEffect(() => {
    if (token) {
      getuserappointments();
    }
  }, [token])

  const cancelAppointment = async (appointmentId) => {

    try {
      const { data } = await axios.post(backendURL + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getuserappointments();
        getDoctorsData();
      }
      else {
        toast.error(data.message);
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }


  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

          // Send the data in the POST request body
          const { data } = await axios.post(backendURL + '/api/user/verifyrazorpay', {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
          }, { headers: { token } });

          if (data.success) {
            getuserappointments();
            navigate('/my-appointments');
          }
        }
        catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendURL + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } });
      if (data.success) {
        initPay(data.order);
      }
    }
    catch (error) {

    }
  }

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
      <div>
        {appointments.map((item, index) => (
          <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'>
            <div>
              <img src={item.docData.image} alt="" className='w-32 bg-indigo-50' />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData.address}</p>
              <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span>{slotDateFormat(item.slotDate)}| {item.slotTime}</p>
            </div>

            <div className='flex flex-col gap-2 justify-end'>
              {!item.cancelled && item.payment && <button className='sm:min-w-48 py-2 rounded text-black bg-green-200 min-h-8 h-9'>Paid</button>}
              {!item.cancelled && !item.payment && <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300' onClick={() => appointmentRazorpay(item._id)}>Pay online</button>}

              {!item.cancelled && <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded  hover:bg-red-600 hover:text-white transition-all duration-300' onClick={() => cancelAppointment(item._id)}>Cancel appointment</button>}
              {item.cancelled &&
                <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Myappointments
