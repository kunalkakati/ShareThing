import React from 'react';
// import { useNavigate } from 'react-router-dom';
import AllBlogs from './AllBlogs';
import Introduction from './Introduction';
import AdminDashboard from './Admin/Dashboard';




function Home() {
  // const navigate = useNavigate();
  // if(!window.localStorage.getItem("Token")){
  //   navigate("/share-thing/intro", { replace: true });
  // }

  return (
    <>
      {window.localStorage.getItem("Token") ? <AllBlogs /> : window.localStorage.getItem("AdminToken") ? <AdminDashboard /> : <Introduction />}
    </>
  )
}

export default Home;