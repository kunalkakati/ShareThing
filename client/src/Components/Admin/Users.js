import React, { useContext} from 'react'
import AlertContex from '../../Context/blogs/AlertContext';
import UserContext from '../../Context/user/UserContext'
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Chip } from '@mui/material';



function Users({ user,index }) {
    const UserState = useContext(UserContext);
    const AlertState = useContext(AlertContex);
    const {DeleteUser} = UserState;

    return (
            <tr>
                <th scope="row">{index +1}</th>
                <td>{user.Username}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
                <td><Chip label="remove" variant="outlined" onDelete={() =>{DeleteUser(user._id) && AlertState.giveAlert('success',"Successfully deleted.")}} /></td>
            </tr>
    )
}

export default Users