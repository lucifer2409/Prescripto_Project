import React, { useContext, useEffect, useState } from 'react';
import RelatedDoctors from '../components/RelatedDoctors';
import { assets } from '../assets/assets_frontend/assets';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysofweek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchdocinfo = async () => {
    const doctorInfo = doctors.find(doctor => docId === doctor._id);
    setDocInfo(doctorInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeslots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        timeslots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots(prev => ([...prev, timeslots]));
    }
  };

  useEffect(() => {
    fetchdocinfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);


  return docInfo && (
    <div>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img src={docInfo.image} alt="" className='bg-primary w-full sm:max-w-72 rounded-lg' />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name} <img src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0 px-2 border text-sm rounded-full'>{docInfo.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee : <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {docSlots.length > 0 && docSlots.map((item, index) => (
            <div key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} onClick={() => setSlotIndex(index)}>
              <p>{item[0]?.datetime && daysofweek[item[0].datetime.getDay()]}</p>
              <p>{item[0]?.datetime && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots[slotIndex] && docSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} key={index} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded my-6'>
          Book an appointment
        </button>
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;
