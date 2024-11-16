import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();
import axios from 'axios';
import { toast } from "react-toastify";
const AdminContextProvider = (props) => {
    const [atoken, setAtoken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
    const [doctors, setDoctors] = useState([]);
    const [appointments , setAppointments] = useState([]);
    const [dashdata , setDashData] = useState(false);
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const getAlldoctors = async () => {
        try {
            const { data } = await axios.post(backendURL + '/api/admin/all-doctors', {}, { headers: { atoken } });
            if (data.success) {
                setDoctors(data.doctors);
                console.log(data.doctors);
            }
            else {
                toast.error(data.message);
            }
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    const cancelAppointment = async(appointmentId) => {
        try{
            const { data } = await axios.post(backendURL + '/api/admin/cancel-appointment' , {appointmentId} , {headers:{atoken}});
            if(data.success){
                toast.success(data.message);
                getAllAppointments();
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            toast.error(error.message);
        }
    }

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(backendURL + '/api/admin/change-availability', { docId }, { headers: { atoken } });
            if (data.success) {
                toast.success(data.message);
                getAlldoctors();
            }
            else {
                toast.error(data.message);
            }
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(backendURL + '/api/admin/appointments' , {headers:{atoken}});

            if(data.success){
                setAppointments(data.appointments);
                console.log(data.appointments);
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            toast.error(error.message);
        }
    }

    const getDashData = async() => {
        try{
            const { data } = await axios.get(backendURL + '/api/admin/dashboard' , {headers:{atoken}});
            if(data.success){
                setDashData(data.dashData);
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            toast.error(error.message);
        }
    }
    const value = {
        atoken, setAtoken, backendURL, doctors, getAlldoctors, changeAvailability , appointments , setAppointments , getAllAppointments , cancelAppointment , dashdata , getDashData
    };
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;