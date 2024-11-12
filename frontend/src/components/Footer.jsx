import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm'>
        {/* {Left section } */}
        <div>
            <img src={assets.logo} alt="" className='mb-5 w-40'/>
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        {/* {centre section} */}
        <div>
            <p className='text-xl font-medium mb-5'>
                Company
            </p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Contact us</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        {/* {Right section } */}
        <div className='text-xl font-light mb-5'>
            <p>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+91 842488478272</li>
                <li>trivedi.a@somaiya.edu</li>
            </ul>
        </div>
      </div>
      <div>
        {/* {copyright text} */}
        <hr />
        <p className='py-5 text-sm text-center'>
            Copyright 2024 - All right reserved
        </p>
      </div>
    </div>
  )
}

export default Footer
