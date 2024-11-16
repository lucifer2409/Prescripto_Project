import { useState } from "react";
import { createContext } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [dtoken , setDToken] = useState((localStorage.getItem('dtoken') ? localStorage.getItem('dtoken') : ''));;

    const [appointments , setAppointments ] = useState([]);

    const getAppointments = async () => {
        try{
            const {data} = await axios.get(backendURL + '/api/doctor/appointments' , {headers:{dtoken}});
            if(data.success){
                setAppointments(data.appointments.reverse());
                console.log(data.appointments.reverse());
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


    const value = {
        dtoken , 
        setDToken , 
        backendURL , 
        getAppointments , 
        appointments , 
        setAppointments , 
        completeAppointment , 
        cancelAppointment
    };
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;