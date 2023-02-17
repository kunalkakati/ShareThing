import React, { useContext, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
import Blogs from './Blogs';
import Introduction from './Introduction';
import AdminDashboard from './Admin/Dashboard';
import UserContext from '../Context/user/UserContext';




function Home() {

  const UserState = useContext(UserContext);
    const { getCurrentUserDetails } = UserState;

    useEffect(() => {
      if(window.localStorage.getItem("Token") && !window.localStorage.getItem("AdminToken")){
        getCurrentUserDetails();
      }
      // eslint-disable-next-line
      }, [])

  return (
    <>
      {/* Dynamically changing the home path by chaking loged in or loged out and also change path based on who loged in */}
      {window.localStorage.getItem("Token") ? <Blogs /> : window.localStorage.getItem("AdminToken") ? <AdminDashboard /> : <Introduction />}
    </>
  )
}

export default Home;