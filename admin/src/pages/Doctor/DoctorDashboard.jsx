import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'

const DoctorDashboard = () => {
  const { dashData,
    setDashData,
    getDashData , dtoken } = useContext(DoctorContext);

    useEffect(() => {
      if(dtoken){
        getDashData();
      }
    } , [dtoken])
  return dashData && (
    <div>

    </div>
  )
}

export default DoctorDashboard
