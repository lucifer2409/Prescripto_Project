import React, { useState, useContext } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify';

const Adddoctor = () => {
  const [docimg, Setdocimg] = useState(null);
  const [name, Setname] = useState('');
  const [email, Setemail] = useState('');
  const [password, Setpassword] = useState('');
  const [experience, Setexperience] = useState('1 Year');
  const [fees, Setfees] = useState('');
  const [about, Setabout] = useState('');
  const [speciality, Setspeciality] = useState('General physician');
  const [degree, Setdegree] = useState('');
  const [address, Setaddress] = useState('');
  const { atoken, backendURL } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email' , email);
      formData.append('password' , password);
      formData.append('fees' , fees);
      formData.append('degree' , degree);
      formData.append('address' , address);
      formData.append('speciality' , speciality);
      formData.append('experience' , experience);
      formData.append('about' , about);
  
      const response = await fetch(`${backendURL}/api/admin/add-doctor`, {
        method: 'POST',
        headers: { 'atoken': atoken, 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)) // Convert FormData to JSON
      });
  
      const data = await response.json();
      console.log("API Response:", data);
  
      if (data && data.success) {
        toast.success(data.message);
        Setname('');
        Setpassword('');
        Setemail('');
        Setaddress('');
        Setabout('');
        Setdegree('');
        Setfees('');
        

      } else {
        toast.error(data ? data.message : "Unexpected error occurred");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };


  return (
    <form className='m-5 w-full' onSubmit={onSubmitHandler}>
      <p className='mb-3 text-lg font-medium'>Add doctor</p>
      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-image">
            <img 
              src={docimg ? URL.createObjectURL(docimg) : assets.upload_area} 
              alt="upload_image" 
              className='w-16 bg-gray-100 rounded-full cursor-pointer' 
            />
          </label>
          <input 
            type="file" 
            id='doc-image' 
            hidden 
            onChange={(e) => Setdocimg(e.target.files[0])} 
          />
          <p>Upload doctor <br />picture </p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor name</p>
              <input 
                type="text" 
                placeholder='Name' 
                required 
                className='border rounded px-3 py-2' 
                onChange={(e) => Setname(e.target.value)} 
                value={name} 
              />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor email</p>
              <input 
                type="email" 
                placeholder='Email' 
                required 
                className='border rounded px-3 py-2' 
                onChange={(e) => Setemail(e.target.value)} 
                value={email} 
              />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor password</p>
              <input 
                type="password" 
                placeholder='Password' 
                required 
                className='border rounded px-3 py-2' 
                onChange={(e) => Setpassword(e.target.value)} 
                value={password} 
              />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select 
                className='border rounded px-3 py-2' 
                onChange={(e) => Setexperience(e.target.value)} 
                value={experience}
              >
                {/* Options for experience */}
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input 
                type="number" 
                placeholder='Fees' 
                required 
                className='border rounded px-3 py-2' 
                onChange={(e) => Setfees(e.target.value)} 
                value={fees} 
              />
            </div>
          </div>
          <div className='w-full gap-4 lg:flex-1 flex flex-col'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select 
                className='border rounded px-3 py-2' 
                onChange={(e) => Setspeciality(e.target.value)} 
                value={speciality}
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Education</p>
              <input 
                type="text" 
                placeholder='Education' 
                required 
                className='border rounded px-3 py-2' 
                onChange={(e) => Setdegree(e.target.value)} 
                value={degree} 
              />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Address</p>
              <input 
                type="text" 
                placeholder='Main address' 
                required 
                className='border rounded px-3 py-2' 
                onChange={(e) => Setaddress(e.target.value)} 
                value={address} 
              />
            </div>
          </div>
        </div>

        <div>
          <p className='mt-4 mb-2'>About Doctor</p>
          <textarea 
            placeholder='Write something about the doctor' 
            required 
            rows={5} 
            className='w-full px-4 pt-2 border rounded' 
            onChange={(e) => Setabout(e.target.value)} 
            value={about} 
          />
        </div>
        <button className='bg-primary px-10 py-3 mt-4 text-white rounded-full' type='submit'>Add doctor</button>
      </div>
    </form>
  )
}

export default Adddoctor;
