import React, { useState } from 'react'
import UserContext from './UserContext';

const host = `http://localhost:5000`;

const UserState = (props) => {
  const [currentUser, setCurrentUser] = useState({_id: '', Username: '', email: '', department: '' })
  const getCurrentUserDetails = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
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
    const response = await fetch(`${host}/api/auth/delete/user/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    await response.json();
    window.location.reload(false);
  }


  return (
    <UserContext.Provider value={{ currentUser, getCurrentUserDetails, DeleteUser }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState;