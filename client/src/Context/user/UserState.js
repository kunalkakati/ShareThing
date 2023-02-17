import React, { useState } from 'react'
import UserContext from './UserContext';


const UserState = (props) => {
  const [currentUser, setCurrentUser] = useState({_id: '', Username: '', email: '', department: '' });

  const getCurrentUserDetails = async () => {
    const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/getuser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': window.localStorage.getItem('Token')
      },
    })
    const data = await response.json();
    setCurrentUser(data);
  }


  const DeleteUser = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/delete/user/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    await response.json();
    window.location.reload(false);
  }

  
  const UpdateUserPassword = async (uid,newPassword, oldPassword) =>{
    const url = `${process.env.REACT_APP_HOST}/api/auth/user/update/${uid}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({newPassword,oldPassword}),
    })
    const data = await response.json();
    return data.state;
  }


  return (
    <UserContext.Provider value={{ currentUser,UpdateUserPassword, getCurrentUserDetails, DeleteUser }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState;