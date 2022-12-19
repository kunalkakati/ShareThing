import React, { useContext, useEffect } from 'react'
import UserContext from '../Context/user/UserContext';
import "./CSS/Profile.css";
import { Link} from "react-router-dom";


function Profile() {
    const UserState = useContext(UserContext);
    const { getSingleUser, singleUser } = UserState;
    const { Username, email, department } = singleUser;

    useEffect(() => {
        getSingleUser();
        // eslint-disable-next-line
    }, [])

    return (
        <div className='profile'>
            <div class="card mb-3 pr-card" style={{maxWidth: "60vw"}}>
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="http://www.butte.edu/_resources/img/home/campus-center.jpg" class="img-fluid rounded-start" alt="..." />
                    </div>
                    <div class="col-md-8 card-col">
                        <div class="card-body">
                            <h1 class="card-title">{Username}</h1>
                            <p class="card-title">Department of {department}</p>
                            <p class="card-text">{email}</p>
                            <Link to='/update_password' className='btn btn-info' >Update password</Link>
                            <Link to='/delete20%account' className='btn btn-warning mx-2' >Delete account</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile