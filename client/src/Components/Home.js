import React, { useContext, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
import AllBlogs from './AllBlogs';
import Introduction from './Introduction';
import AdminDashboard from './Admin/Dashboard';
import UserContext from '../Context/user/UserContext';




function Home() {

  const UserState = useContext(UserContext);
    const { getCurrentUser } = UserState;

    useEffect(() => {
      if(window.localStorage.getItem("Token")){
        getCurrentUser();
      }
        // eslint-disable-next-line
    }, [])

  return (
    <>
      {/* Dynamically changing the home path by chaking loged in or loged out and also change path based on who loged in */}
      {window.localStorage.getItem("Token") ? <AllBlogs /> : window.localStorage.getItem("AdminToken") ? <AdminDashboard /> : <Introduction />}
    </>
  )
}

export default Home;