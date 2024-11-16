import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import { useEffect } from 'react';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setAtoken, backendURL } = useContext(AdminContext);
    const {setDToken , dtoken} = useContext(DoctorContext);
    useEffect(() => {
      const storedToken = localStorage.getItem('aToken');
      if (storedToken) {
          console.log("Token from localStorage:", storedToken);
          setAtoken(storedToken);
      }
  }, []); // Runs on component mount
  
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (state === 'Admin') {
                const response = await axios.post(`${backendURL}/api/admin/login`, { email, password });
                const { data } = response;

                if (data.success) {
                    // Save the token and user info (if needed)
                    localStorage.setItem('aToken', data.token);
                    console.log(data.token);
                    setAtoken(data.token);
                    // Redirect or perform other actions
                } else {
                    toast.error(data.message || "Login failed.");
                }
            } else {
                const {data} = await axios.post(backendURL + '/api/doctor/login' , {email , password});
                if (data.success) {
                    localStorage.setItem('dtoken', data.token);
                    setDToken(data.token);
                    console.log(data.token);
                } else {
                    toast.error(data.message || "Login failed.");
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("Login failed. Please try again.");
        }
    };

    return (
        <form className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandler}>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto'>
                    <span className='text-primary'>{state} </span>Login
                </p>
                <div className='w-full'>
                    <p>Email</p>
                    <input
                        type="email"
                        required
                        className='border border-[#DADADA] rounded w-full p-2 mt-1'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input
                        type="password"
                        required
                        className='border border-[#DADADA] rounded w-full p-2 mt-1'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
                {
                    state === 'Admin'
                        ? <p>Doctor Login? <span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer'>Click here</span></p>
                        : <p>Admin Login? <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer'>Click here</span></p>
                }
            </div>
        </form>
    );
};

export default Login;
