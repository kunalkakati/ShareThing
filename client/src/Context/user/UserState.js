import React, {useState } from 'react'
import UserContext from './UserContext';



const UserState = (props) => {
    const [singleUser, setSingleUser] = useState({ Username: '', email: '', department: '' })
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

  return (
    <UserContext.Provider value={{getSingleUser, singleUser}}>
        {props.children}
    </UserContext.Provider>
  )
}

export default UserState;