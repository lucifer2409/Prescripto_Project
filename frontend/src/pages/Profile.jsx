import React, { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "Abhishek trivedi",
    image: assets.profile_pic,
    email: "trivedi.a@somaiya.edu",
    phone: '+91 8424884788',
    address: 'Fam chs koperkhairne 33/504 bonkode navimumbai',
    gender: 'Male',
    dob: '24-09-2002'
  }
  )
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      <img src={userData.image} alt="" className='w-36 rounded'/>
      {
        isEdit ? <input value={userData.name} className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} /> : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none'/>
      <div>
        <p className='text-neutral-500 underline mt-3'>
          CONTACT INFORMATION
        </p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email Id :</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit ? <input className='bg-gray-100 max-w-52' value={userData.phone} type="text" onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} /> : <p className='text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {
            isEdit ?
              <p>
                <input type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: e.target.value }))} className='bg-gray-50'/>
              </p> :
              <p className='text-gray-500'>
                {userData.address}
              </p>
          }
        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>
          BASIC INFORMATION
        </p>
        <div className='grid grid-cols-[1fr_3fr gap-y-2.5 mt-3 text-neutral-700]'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit ?
              <select onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} className='max-w-20 bg-gray-100'>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              : <p className='text-gray-400'>{userData.gender}</p>
          }
          <p className='font-medium'>Birthday:</p>
          {
            isEdit ? 
            <input type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} className='max-w-28 bg-gray-100'>
            <p className='text-gray-400'>{userData.dob}</p>
            </input> : <p>{userData.dob}</p>
          }
        </div>
      </div>
      <div className='mt-10'>
        {
          isEdit ? 
          <button onClick={() => setIsEdit(false)} className='border border-primary px-8 py-2 rounded-full hover:text-white transition-all'>Save information</button>
          : <button onClick={() => setIsEdit(true)} className='border border-primary px-8 py-2 rounded-full hover:text-white transition-all'>Edit</button>
        }
      </div>
    </div>
  )
}

export default Profile
