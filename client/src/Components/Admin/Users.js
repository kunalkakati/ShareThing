import React from 'react'

function Users({ user,index }) {
    return (
            <tr>
                <th scope="row">{index +1}</th>
                <td>{user.Username}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
            </tr>
    )
}

export default Users