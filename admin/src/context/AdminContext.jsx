import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [atoken , setAtoken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const value = {
        atoken , setAtoken , backendURL,
    };
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;