import { createContext, useEffect, useState } from "react";
export const AppContext = createContext();
import axios from 'axios';
import { toast } from 'react-toastify';


const AppContextProvider = (props) => {
    const currencySymbol = '₹';
    const [userData, setUserData] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const backendURL = import.meta.env.VITE_BACKEND_URL;




    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendURL + '/api/user/get-profile', { headers: { token } });
            if (data.success) {
                setUserData(data.userData);
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
    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendURL + '/api/doctor/list');
            if (data.success) {
                setDoctors(data.doctors);
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


    const value = {
        doctors, currencySymbol, token, setToken, backendURL , userData , setUserData , loadUserProfileData , getDoctorsData
    }

    useEffect(() => {
        getDoctorsData();
    }, []);

    useEffect(()=> {
        if(token){
            loadUserProfileData()
        }
        else{
            setUserData(false);
        }
    } , [token])
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;