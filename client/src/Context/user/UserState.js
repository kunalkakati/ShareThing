import React, { useState } from 'react'
import UserContext from './UserContext';


const UserState = (props) => {
  const [currentUser, setCurrentUser] = useState({_id: '', Username: '', email: '', department: '' })
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


  return (
    <UserContext.Provider value={{ currentUser, getCurrentUserDetails, DeleteUser }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState;