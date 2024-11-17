import { useState } from "react";
import { createContext } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [dtoken , setDToken] = useState((localStorage.getItem('dtoken') ? localStorage.getItem('dtoken') : ''));;

    const [appointments , setAppointments ] = useState([]);
    const [dashData , setDashData] = useState(false);
    const getAppointments = async () => {
        try{
            const {data} = await axios.get(backendURL + '/api/doctor/appointments' , {headers:{dtoken}});
            if(data.success){
                setAppointments(data.appointments);
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }

    const completeAppointment = async (appointmentId) => {
        try{
            const {data} = await axios.post(backendURL + '/api/doctor/complete-appointment' , {appointmentId} , {headers:{dtoken}});
            if(data.success){
                toast.success(data.message);
                getAppointments();
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }


    const cancelAppointment = async (appointmentId) => {
        try{
            const {data} = await axios.post(backendURL + '/api/doctor/cancel-appointment' , {appointmentId} , {headers:{dtoken}});
            if(data.success){
                toast.success(data.message);
                getAppointments();
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }


    const getDashData = async () => {
        try{
            const {data} = await axios.get(backendURL + '/api/doctor/dashboard' , {headers:{dtoken}});
            if(data.success){
                setDashData(data.dashData);
                console.log(data.dashData);
            }
            else {
                toast.error(data.message);
            }
        }
        catch(error)
        {
            console.log(error);
            toast.error(error.message);
        }
    }
    const value = {
        dtoken , 
        setDToken , 
        backendURL , 
        getAppointments , 
        appointments , 
        setAppointments , 
        completeAppointment , 
        cancelAppointment , 
        dashData , 
        setDashData , 
        getDashData
    };
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;