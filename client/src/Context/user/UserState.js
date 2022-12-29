import React, { useState } from 'react'
import UserContext from './UserContext';



const UserState = (props) => {
  const [singleUser, setSingleUser] = useState({_id: '', Username: '', email: '', department: '' })
  const getSingleUser = async () => {
    const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': window.localStorage.getItem('Token')
      },
    })
    const data = await response.json();
    setSingleUser(data);
  }


  const DeleteUser = async (id) => {
    const response = await fetch(`http://localhost:5000/api/auth/delete/user/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    await response.json();
    window.location.reload(false);
  }


  return (
    <UserContext.Provider value={{ getSingleUser, singleUser, DeleteUser }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState;