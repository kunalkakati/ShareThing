import React, { useContext, useEffect } from 'react'
import UserContext from '../Context/user/UserContext';
import "./CSS/Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';
import LockResetIcon from '@mui/icons-material/LockReset';
import ErrorPage from './ErrorPage';
import UserBlogs from './UserBlogs';



function Profile() {
    const UserState = useContext(UserContext);
    const { currentUser, getCurrentUserDetails } = UserState;
    const { Username, email, department } = currentUser;

    useEffect(() => {
        getCurrentUserDetails();
        // eslint-disable-next-line
    }, [])
    const navigate = useNavigate();
    const UserLogout = () => {
        window.localStorage.removeItem("Token");
        navigate("/login", { replace: true });
    }

    return (
        <>
            {window.localStorage.getItem("Token") ?
                <>
                    <div className='profile'>
                        <div className="profile-content">
                            <img src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image.png" alt="profile avatar" />
                            <div className="user-info">
                                <h3 className='card-title'>{Username}</h3>
                                <p className='card-subtitle'><EmailIcon /> {email}</p>
                                <p className='card-text'><SchoolIcon /> Department of {department}</p>
                            </div>
                        </div>
                        <div>
                        <Link to='/user/update'> <Button className='mx-3' variant="contained" color='warning' startIcon={<LockResetIcon />} >Update Password</Button></Link>
                        <Button variant="outlined" color='error' startIcon={<LogoutIcon />} onClick={UserLogout} >Logout</Button>
                        </div>
                    </div>
                    <hr />
                    <UserBlogs />
                </> : <ErrorPage type='404' typeString="Unauthorized" msg="Please login first" path="/login" />
            }
        </>
    )
}

export default Profile