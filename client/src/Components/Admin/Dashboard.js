import React, { useEffect, useState } from 'react'
import "../CSS/Dashboard.css";
import { Link } from 'react-router-dom';
import Users from './Users';
import ErrorPage from '../ErrorPage';


function Dashboard() {
    const [users, setUsers] = useState([{ Username: '', email: '', department: '' }]);
    const getAllUsers = async () => {
        const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json();
        setUsers(data);
        console.log(data);
    }

    useEffect(() => {
        getAllUsers();
    }, [])

    return (<>
        { window.localStorage.getItem('AdminToken') ?
            <div className='db'>
                {/* <h2>Dashboard</h2> */}
                <div className='db-container'>
                    <Link className='db-destination' to="/admin/dashboard/blogs">Blogs</Link>
                    <Link className='db-destination' to="/admin/dashboard/new_registration">New student egistration</Link>
                    <Link className='db-destination' to="/admin/new_admin_registration">New Admin registration</Link>
                </div>
                <hr />
                <div className='db-all-users'>
                    <h2>Users</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => {
                                return <Users key={index} user={user} index={index} />
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
            :
            <ErrorPage type='401' typeString="Unauthorized" msg="Plase login first" path="/admin" />
        
        }
        </>
    )
}

export default Dashboard